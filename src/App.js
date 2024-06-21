import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ServiceProvider } from "./contexts/ServiceContext";
import router from "./router/router";
import "./css/index.css";
import api from "./api/api";

const App = () => {
  console.log("App");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <ServiceProvider>
      <RouterProvider router={router} />
    </ServiceProvider>
  );
};

export default App;
