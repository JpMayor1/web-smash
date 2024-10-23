import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserLogin from "./pages/auth/UserLogin";
import IsAuthenticated from "./protectedRoute/IsAuthenticated";
import ErrorPage from "./pages/ErrorPage";
import IsUserRoute from "./protectedRoute/IsUserRoute";
import UserHome from "./pages/user/UserHome";
import IsAdminRote from "./protectedRoute/isAdminRote";
import Conditioning from "./pages/admin/Conditioning";
import UserSignup from "./pages/auth/UserSignup";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminSignup from "./pages/auth/AdminSignup";
import MaleTrainings from "./pages/admin/MaleTrainings";
import FemaleTrainings from "./pages/admin/FemaleTrainings";
import UserTrainings from "./pages/user/UserTrainings";
import UserProfile from "./pages/user/UserProfile";
import MaleTraining from "./pages/admin/training/MaleTraining";
import FemaleTraining from "./pages/admin/training/FemaleTraining";
import MaleUserTraining from "./pages/admin/training/MaleUserTraining";
import FemaleUserTraining from "./pages/admin/training/FemaleUserTraining";
import UserViewTraning from "./pages/user/training/UserViewTraining";
import UserConditioning from "./pages/user/UserConditioning";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IsAuthenticated />,
    children: [
      {
        path: "/",
        element: <UserLogin />,
      },
      {
        path: "/user/signup",
        element: <UserSignup />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/signup",
        element: <AdminSignup />,
      },
    ],
  },
  {
    path: "/user",
    element: <IsUserRoute />,
    children: [
      {
        path: "/user",
        element: <UserHome />,
      },
      {
        path: "/user/conditioning",
        element: <UserConditioning />,
      },
      {
        path: "/user/trainings",
        element: <UserTrainings />,
      },
      {
        path: "/user/trainings/:trainingId",
        element: <UserViewTraning />,
      },
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <IsAdminRote />,
    children: [
      {
        path: "/admin",
        element: <Conditioning />,
      },
      {
        path: "/admin/trainings/male",
        element: <MaleTrainings />,
      },
      {
        path: "/admin/trainings/male/training/:trainingId",
        element: <MaleTraining />,
      },
      {
        path: "/admin/trainings/male/training/:trainingId/:userId",
        element: <MaleUserTraining />,
      },
      {
        path: "/admin/trainings/female",
        element: <FemaleTrainings />,
      },
      {
        path: "/admin/trainings/female/training/:trainingId",
        element: <FemaleTraining />,
      },
      {
        path: "/admin/trainings/female/training/:trainingId/:userId",
        element: <FemaleUserTraining />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
