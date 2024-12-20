import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import bg from "../assets/web-smash-bg.jpg";

const IsAuthenticated = () => {
  const authUser = useAuthStore((state) => state.authUser);

  if (authUser) {
    if (authUser.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (authUser.role === "user") {
      return <Navigate to="/user" />;
    }
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-full w-full flex items-center overflow-y-auto overflow-x-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Outlet />;
    </div>
  );
};

export default IsAuthenticated;
