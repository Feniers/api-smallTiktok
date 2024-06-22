import React, { useEffect, useRef, useState } from "react";
import { ServiceContext } from "../contexts/ServiceContext";
import {
  Button,
  Dropdown,
  Image,
  Row,
  Table,
  Space,
  message,
  Modal,
} from "antd";
import "../css/Profile.css";
import {
  AccountBookOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
  ShoppingOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchVideos, deleteVideo } from "../api/VideoApi";
import VideoComponent from "../components/VideoComponent";

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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchVideos(pagination.current, pagination.pageSize)
      .then((response) => {
        setVideos(response.data.rows);
        console.log(response.data.rows);
        setPagination({
          ...pagination,
          total: response.data.total,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch videos: ", error);
        setLoading(false);
      });
  }, [pagination.current, pagination.pageSize]);
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  const handleDelete = (videoID) => {
    deleteVideo(videoID).then((response) => {
      message.success("删除成功");
      setVideos(videos.filter((item) => item.videoID !== videoID));
    });
  };
  const handleItemClick = (item) => {
    console.log(item);
    if (!user) {
      alert("请先登录");
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };
  const handlePlay = (url) => {
    setCurrentVideoUrl(url);
    setIsModalVisible(true);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => handlePlay(record.url)}
          >
            Play
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.videoID)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
      <div className="profile-items">
        <Table
          columns={columns}
          dataSource={videos}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowKey="videoId"
        />
      </div>
      <Modal
        // visible={isModalVisible}
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={400}
      >
        {currentVideoUrl && (
          <VideoComponent
            src={currentVideoUrl}
            onEnded={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
      {/*{currentVideoUrl && (*/}
      {/*    <div className="video-player-container">*/}
      {/*      <video*/}
      {/*          ref={videoPlayerRef}*/}
      {/*          src={currentVideoUrl}*/}
      {/*          controls*/}
      {/*          autoPlay*/}
      {/*          style={{*/}
      {/*            width: "100%",*/}
      {/*            height: "100%",*/}
      {/*            position: "fixed",*/}
      {/*            top: 0,*/}
      {/*            left: 0,*/}
      {/*            zIndex: 1000,*/}
      {/*            backgroundColor: "black",*/}
      {/*          }}*/}
      {/*          onEnded={() => setCurrentVideoUrl(null)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*)}*/}
    </div>
  );
}

export default Profile;
