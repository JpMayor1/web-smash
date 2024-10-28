import { useState } from "react";
import { Link } from "react-router-dom";
import useUserSignup from "../../hooks/user/useUserSignup";
import {
  EmailIcon,
  GraduationScrollIcon,
  KeyIcon,
  Mortarboard01Icon,
  UserIcon,
} from "../../components/svg/svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserSignup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gradeLevel: "",
    section: "",
    gender: "male",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup, loading } = useUserSignup();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(
      form.firstName,
      form.lastName,
      form.email,
      form.password,
      form.confirmPassword,
      Number(form.gradeLevel),
      form.section,
      form.gender
    );
  };

  return (
    <div className="h-full min-h-screen w-screen flex items-center justify-center p-3 overflow-y-auto">
      <div className="h-fit w-full max-w-xl shadow-md bg-black/50 backdrop-blur-lg rounded-md p-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-primary/90">
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <UserIcon />
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full"
              placeholder="First Name"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <UserIcon />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full"
              placeholder="Last Name"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <EmailIcon />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <KeyIcon />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-[90%]"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="w-[10%]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <KeyIcon />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-[90%]"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className="w-[10%]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>

          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <Mortarboard01Icon />
            <input
              type="number"
              name="gradeLevel"
              value={form.gradeLevel}
              onChange={handleChange}
              className="w-full"
              placeholder="Grade Level"
              min={1}
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 text-white bg-black">
            <GraduationScrollIcon />
            <input
              type="text"
              name="section"
              value={form.section}
              onChange={handleChange}
              className="w-full"
              placeholder="Section"
              required
            />
          </label>

          <select
            className="select select-bordered w-full text-white bg-black"
            name="gender"
            onChange={handleChange}
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="flex flex-col items-center justify-center mt-5">
          <Link to="/" className="text-sm text-primary hover:text-primary/70">
            {`Already have an account? Login here!`}
          </Link>

          <div className="w-full border border-tertiary/35 my-3" />

          <Link
            to="/admin/signup"
            className="text-sm text-primary hover:text-primary/70"
          >
            {`Sign up as Admin`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
