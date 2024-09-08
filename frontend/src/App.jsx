import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserLogin from "./pages/auth/UserLogin";
import IsAuthenticated from "./protectedRoute/IsAuthenticated";
import ErrorPage from "./pages/ErrorPage";
import IsUserRoute from "./protectedRoute/IsUserRoute";
import UserHome from "./pages/user/UserHome";
import IsAdminRote from "./protectedRoute/isAdminRote";
import AdminHome from "./pages/admin/AdminHome";
import UserSignup from "./pages/auth/UserSignup";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminSignup from "./pages/auth/AdminSignup";

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
    ],
  },
  {
    path: "/admin",
    element: <IsAdminRote />,
    children: [
      {
        path: "/admin",
        element: <AdminHome />,
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
