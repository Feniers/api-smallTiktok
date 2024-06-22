import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ServiceProvider } from "./contexts/ServiceContext";
import router from "./router/router";
import "./css/index.css";
import api from "./api/api";

const App = () => {
  console.log("App");

  useEffect(() => {
    window.onerror = function (message, source, lineno, colno, error) {
      console.error(
        "Global error caught:",
        message,
        source,
        lineno,
        colno,
        error
      );
      // 可以选择在控制台输出错误信息，或者其他适当的处理
      return true; // 返回 true 阻止浏览器默认行为（如控制台输出）
    };

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
