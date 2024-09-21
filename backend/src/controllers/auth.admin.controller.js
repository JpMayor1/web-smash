import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const adminSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, secretKey } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(409).json({ error: "Email already exists" });
    }

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ error: "Invalid secret key" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newAdmin) {
      generateTokenAndSetCookie(newAdmin._id.toString(), res);
      await newAdmin.save();

      res.status(201).json({
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        email: newAdmin.email,
        role: "admin",
      });
    } else {
      res.status(400).json({ error: "Invalid admin data" });
    }
  } catch (error) {
    if (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin?.password || ""
    );

    if (!admin || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(admin._id.toString(), res);

    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      role: "admin",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const adminLogout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
