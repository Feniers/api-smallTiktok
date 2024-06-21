import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ErrorPage from "../pages/ErrorPage";
import EmptyPage from "../pages/EmptyPage";
import VideoPage from "../pages/VideoPage";
import Register from "../pages/Register";
import VideoUpload from "../pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <VideoPage /> },
      { path: "/upload", element: <VideoUpload /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/empty", element: <EmptyPage /> },
  { path: "/404", element: <ErrorPage /> },
  { path: "*", element: <Navigate to="/404" /> },
  { path: "/test", element: <VideoUpload /> },
]);

export default router;
