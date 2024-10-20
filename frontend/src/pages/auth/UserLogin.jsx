import { useState } from "react";
import { Link } from "react-router-dom";
import useUserLogin from "../../hooks/user/useUserLogin";
import { EmailIcon, KeyIcon } from "../../components/svg/svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const UserLogin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useUserLogin();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(form.email, form.password);
  };
  return (
    <div className="h-full w-screen flex items-center justify-center overflow-y-auto p-3">
      <div className="w-full max-w-xl shadow-md bg-black/50 backdrop-blur-lg rounded-md p-6">
        <h2 className="text-4xl font-bold text-center mb-6 text-primary/90">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center mt-5">
          <Link
            to="/user/signup"
            className="text-sm text-primary hover:text-primary/70"
          >
            {`Don't have an account? Signup here!`}
          </Link>

          <div className="w-full border border-tertiary/35 my-3" />

          <Link
            to="/admin/login"
            className="text-sm text-primary hover:text-primary/70"
          >
            {`Login as Admin`}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
