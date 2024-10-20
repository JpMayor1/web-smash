import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import bg from "../assets/web-smash-bg.jpg";
import useGetAllTraining from "../hooks/admin/training/useGetAllTraining";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorTextPage from "../components/ErrorTextPage";
import UserNavBar from "../components/user/UserNavBar";
import { useEffect } from "react";

const IsUserRoute = () => {
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

  if (authUser && authUser.role === "admin") {
    return <Navigate to="/admin" />;
  } else if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen w-screen flex flex-col items-center overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="h-full w-full flex items-center justify-center overflow-y-auto">
        <Outlet />
      </div>
      <UserNavBar />
    </div>
  );
};

export default IsUserRoute;
