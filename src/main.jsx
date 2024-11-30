import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root.jsx";
import { RouterProvider } from "react-router";
import Dashboard from "./Pages/Dashboard.jsx";
import Analytics from "./ComponentsOfDashboard/Analytics.jsx";
import Users from "./ComponentsOfDashboard/Users.jsx";
import MyProfile from "./ComponentsOfDashboard/MyProfile.jsx";
import AddItem from "./ComponentsOfDashboard/AddItem.jsx";
import Slider from "./ComponentsOfDashboard/Slider.jsx";
import Reviews from "./ComponentsOfDashboard/Reviews.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import Login from "./Authentications/Login.jsx";
import Register from "./Authentications/Register.jsx";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./AuthProvider/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "analytics",
        element: <Analytics></Analytics>,
      },
      {
        path: "users",
        element: <Users></Users>,
      },
      {
        path: "profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "additem",
        element: <AddItem></AddItem>,
      },
      {
        path: "slider",
        element: <Slider></Slider>,
      },
      {
        path: "reviews",
        element: <Reviews></Reviews>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
