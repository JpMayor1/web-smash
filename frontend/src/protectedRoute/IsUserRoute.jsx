import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const IsUserRoute = () => {
  const authUser = useAuthStore((state) => state.authUser);

  if (authUser && authUser.role === "admin") {
    return <Navigate to="/admin" />;
  } else if (!authUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default IsUserRoute;
