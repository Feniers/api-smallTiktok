import React, { useContext } from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ServiceContext } from "../contexts/ServiceContext";

const items = [
  {
    key: "home",

    label: <Link to="/home">首页</Link>,
  },

  {
    key: "upload",
    label: (
      <Link to="/upload">
        <PlusCircleOutlined />
      </Link>
    ),
  },
  {
    key: "profile",
    label: <Link to="/profile">我的</Link>,
  },
];

const FooterMenu = () => {
  // 点击底部导航栏的按钮，跳转到对应的页面
  // 进入首页和上传页面之前，检测用户是否登录，如果没有登录，跳转到登录页面
  const { user: userService } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.key === "home" || e.key === "upload") {
      const user = userService.getUser();
      if (!user || !user.userId) {
        navigate("/login");
        return;
      }
    }
    navigate(`/${e.key}`);
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["home"]}
      items={items}
      theme="dark"
      onClick={handleClick}
      style={{
        height: "50px",
        width: "430px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "black",
        textAlign: "center",
      }}
    ></Menu>
  );
};

export default FooterMenu;
