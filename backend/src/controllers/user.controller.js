import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, gradeLevel, section } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields only if the new values are provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (gradeLevel) user.gradeLevel = gradeLevel;
    if (section) user.section = section;

    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gradeLevel: user.gradeLevel,
        section: user.section,
        role: "user",
      },
    });
  } catch (error) {
    console.log("Error in updateUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
