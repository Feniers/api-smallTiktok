import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const items = [
  {
    key: "home",

    label: (
      <Link to="/home" style={{ color: "white" }}>
        首页
      </Link>
    ),
  },

  {
    key: "add",
    label: (
      <Link to="/add" style={{ color: "white" }}>
        +
      </Link>
    ),
  },
  {
    key: "profile",
    label: (
      <Link to="/profile" style={{ color: "white" }}>
        我的
      </Link>
    ),
  },
];

const FooterMenu = () => {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      items={items}
      style={{
        height: "50px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "black",
      }}
    ></Menu>
  );
};

export default FooterMenu;
