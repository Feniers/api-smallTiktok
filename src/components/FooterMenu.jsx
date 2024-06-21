import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";

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
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["home"]}
      items={items}
      theme="dark"
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
