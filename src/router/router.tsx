import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import SplashScreen from "../pages/SplashScreen/SplashScreen";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Users from "../pages/Users/Users";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
    handle: { title: "Splash" },
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        handle: { title: "Popular Classes" },
      },
      {
        path: "/login",
        element: <Login />,
        handle: { title: "Login" },
      },
      {
        path: "/register",
        element: <Register />,
        handle: { title: "Register" },
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
            handle: { title: "Dashboard" },
          },
          {
            path: "/users",
            element: <Users />,
            handle: { title: "Users" },
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
        handle: { title: "Not Found" },
      },
    ],
  },
]);