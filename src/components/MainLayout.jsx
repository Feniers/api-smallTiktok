import React, { memo, useContext } from "react";
import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import FooterMenu from "./FooterMenu";
import "../css/MainLayout.css";
import { ServiceContext } from "../contexts/ServiceContext";

const { Content, Footer } = Layout;

const MainLayout = memo(function MainLayout() {
  console.log("MainLayout");
  const { user: userService } = useContext(ServiceContext);

  const user = userService.getUser();

  if (!user || !user.userId) {
    console.log("MainLayout: user not found, redirecting to login");
    console.log(user);
    return <Navigate to="/login" />;
  }

  // console.log(
  //   "JSON.parse(localStorage)",
  //   JSON.parse(localStorage.getItem("user"))
  // );

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("MainLayout: user", user);

  // if (!user || !user.userId) {
  //   console.log("MainLayout: user not found, redirecting to login");
  //   console.log(user);
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="main-page">
      <Layout className="main-layout">
        <Content className="main-content">
          <Outlet />
        </Content>
        <Footer className="main-footer">
          <FooterMenu />
        </Footer>
      </Layout>
    </div>
  );
});

export default MainLayout;
