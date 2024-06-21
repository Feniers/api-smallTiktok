import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api/VideoApi";
import "../css/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);

    const user = {
      userId: values.userId,
      username: values.username,
      password: values.password,
    };

    register(user)
      .then((response) => {
        console.log("response", response);
        login(values.userId, values.username, values.password).then(
          (response) => {
            console.log("response", response);
            navigate("/");
          }
        );
      })
      .catch((error) => {
        console.error("Register error:", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register">
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
            label="用户ID"
            name="userId"
            rules={[
              {
                required: true,
                //只能输入数字
                pattern: new RegExp("^[0-9]*$"),
                message: "请输入用户ID！",
              },
            ]}
          >
            <Input />
          </Form.Item>
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

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
