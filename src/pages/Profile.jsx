import React, { useState } from "react";
import { ServiceContext } from "../contexts/ServiceContext";
import { Button, Dropdown, Image, Row } from "antd";
import "../css/Profile.css";
import {
  AccountBookOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const orderItems = [
  {
    key: 1,
    label: "抖音商城",
    path: "/empty",
    icon: <AccountBookOutlined style={{ color: "#CB573C" }} />,
  },
  {
    key: 2,
    label: "观看历史",
    path: "/empty",
    icon: <MoneyCollectOutlined style={{ color: "#CB573C" }} />,
  },
  {
    key: 3,
    label: "我的钱包",
    path: "/empty",
    icon: <ShoppingOutlined style={{ color: "#CB573C" }} />,
  },
  {
    key: 4,
    label: "我的小程序",
    path: "/empty",
    icon: <HistoryOutlined style={{ color: "#CB573C" }} />,
  },
];

function Profile() {
  const { user: userService } = React.useContext(ServiceContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(userService.getUser());

  const handleItemClick = (item) => {
    console.log(item);
    if (!user) {
      alert("请先登录");
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  const loginOrLogout = () => {
    if (user) {
      userService.logout();
      setUser(null);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="profile-page">
      {/* <Button onClick={Login}>登录</Button> */}
      {/* <Button onClick={userService.logout()}>登出</Button> */}
      <div className="person-info">
        <Image
          className="avatar"
          width={150}
          alt="avatar"
          src={
            user
              ? user.avatar
              : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          }
        />
        <div className="info">
          <p>{user ? user.name : "请先登录"}</p>
        </div>
        <div className="setting">
          <Dropdown
            menu={{
              items: [
                { key: 1, label: "个人信息", path: "/404" },
                { key: 2, label: "账号安全", path: "/404" },
                { key: 3, label: "消息通知", path: "/404" },
                { key: 4, label: "隐私设置", path: "/404" },
                {
                  key: 5,
                  label: (
                    <div onClick={loginOrLogout}>
                      {user ? "退出登录" : "登录"}
                    </div>
                  ),
                  path: "/404",
                  danger: user ? true : false,
                },
              ],
            }}
          >
            <Button>
              <SettingOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="profile-order">
        {orderItems.map((item) => (
          <div
            key={item.key}
            className="profile-order-item"
            onClick={() => handleItemClick(item)}
          >
            {item.icon}
            <div>{item.label}</div>
          </div>
        ))}
      </div>
      <div className="profile-items"></div>
    </div>
  );
}

export default Profile;
