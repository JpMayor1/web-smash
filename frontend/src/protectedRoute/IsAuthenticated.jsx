import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const IsAuthenticated = () => {
  const authUser = useAuthStore((state) => state.authUser);

  if (authUser) {
    if (authUser.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (authUser.role === "user") {
      return <Navigate to="/user" />;
    }
  }

  return <Outlet />;
};

export default IsAuthenticated;
