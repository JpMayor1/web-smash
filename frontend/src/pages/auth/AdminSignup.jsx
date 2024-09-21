import { useState } from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/web-smash-bg.jpg";
import useAdminSignup from "../../hooks/admin/useAdminSignup";
import { EmailIcon, KeyIcon, UserIcon } from "../../components/svg/svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminSignup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const { signup, loading } = useAdminSignup();

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
      form.secretKey
    );
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-full min-h-screen w-screen flex items-center justify-center p-5"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-xl shadow-md bg-black/50 backdrop-blur-lg rounded-md p-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-primary/90">
          Sign up as Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            <UserIcon />
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="grow"
              placeholder="First Name"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <UserIcon />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="grow"
              placeholder="Last Name"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <EmailIcon />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="grow"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 relative">
            <KeyIcon />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="grow"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>
          <label className="input input-bordered flex items-center gap-2 relative">
            <KeyIcon />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="grow"
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>

          <label className="input input-bordered flex items-center gap-2 relative">
            <KeyIcon />
            <input
              type={showSecretKey ? "text" : "password"}
              name="secretKey"
              value={form.secretKey}
              onChange={handleChange}
              className="grow"
              placeholder="Secret Key"
              required
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowSecretKey(!showSecretKey)}
            >
              {showSecretKey ? <FaEye /> : <FaEyeSlash />}
            </button>
          </label>

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
          <Link
            to="/admin/login"
            className="text-sm text-primary hover:text-primary/70"
          >
            {`Already have an account? Login here!`}
          </Link>

          <div className="w-full border border-tertiary/35 my-3" />

          <Link
            to="/user/signup"
            className="text-sm text-primary hover:text-primary/70"
          >
            {`Sign up as User`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
