import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";
import EmptyPage from "../pages/EmptyPage";
import VideoPage from "../pages/VideoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <VideoPage /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/empty", element: <EmptyPage /> },
  { path: "/404", element: <ErrorPage /> },
  { path: "*", element: <Navigate to="/404" /> },
]);

export default router;
