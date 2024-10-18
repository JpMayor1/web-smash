import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import bg from "../assets/web-smash-bg.jpg";
import AdminNavBar from "../components/admin/AdminNavBar";
import SubNav from "../components/admin/SubNav";
import useGetAllTraining from "../hooks/admin/training/useGetAllTraining";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorTextPage from "../components/ErrorTextPage";

const IsAdminRote = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const { loading, error, getTrainings } = useGetAllTraining();

  useEffect(() => {
    getTrainings();
  }, [getTrainings]);

  if (loading) {
    return <LoadingSpinner text={"Loading..."} />;
  }

  if (error) {
    return <ErrorTextPage error={error} />;
  }

  if (authUser && authUser.role === "user") {
    return <Navigate to="/user" />;
  } else if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <AdminNavBar />
      <SubNav />
      <Outlet />
    </div>
  );
};

export default IsAdminRote;
