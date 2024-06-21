import { Button, Form, Input, message } from "antd";
import React from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../api/VideoApi";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    login(values.username, values.password)
      .then((response) => {
        console.log("response", response);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        message.error("登录失败");
      });

    // console.log("response", response);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <div className="form-box">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 8,
          }}
          style={{
            maxWidth: 500,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* 注册 */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <a href="/register">没有账号？注册一个</a>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
