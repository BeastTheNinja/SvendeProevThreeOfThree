import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import SplashScreen from "../pages/SplashScreen/SplashScreen";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClassDetails from "../pages/Class/ClassDetails";
import Search from "../pages/Search/Search";
import Schedule from "../pages/Schedule/Schedule";
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
        path: "/class/:id",
        element: <ClassDetails/>,
      },
      {
        path: "/search",
        element: <Search />,
        handle: { title: "search" },
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
            path: "/mySchedule",
            element: <Schedule />,
            handle: { title: "My Schedule" },
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