import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const IsAdminRote = () => {
  const authUser = useAuthStore((state) => state.authUser);

  if (authUser && authUser.role === "user") {
    return <Navigate to="/user" />;
  } else if (!authUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default IsAdminRote;
