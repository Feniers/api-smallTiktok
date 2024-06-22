import { Button, Form, Input, Upload, message } from "antd";
import "../css/UploadPage.css";
import { UploadOutlined } from "@ant-design/icons";
import { uploadVideo } from "../api/VideoApi";
import { useState } from "react";

function VideoUpload() {
  console.log("Upload");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [videoInfo, setVideoInfo] = useState({ name: "", desc: "" });
  const [form] = Form.useForm();
  const handleUpload = () => {
      if (fileList.length === 0) {
          message.error("请选择一个视频文件！");
          return;
      }

      form.validateFields().then(values => {
          const formData = new FormData();
          formData.append("video", fileList[0]);
          formData.append("name", values.name);
          formData.append("desc", values.desc);
            console.log("formData111111111", formData);
          setUploading(true);
          uploadVideo(formData)
              .then((response) => {
                  console.log("response", response);
                  setUploading(false);
                  setFileList([]);
                  form.resetFields();
                  message.success("Upload successfully");
              })
              .catch((error) => {
                  console.error("Failed to upload video: ", error);
                  setUploading(false);
                  message.error("Upload failed");
              });
      }).catch(errorInfo => {
          console.log("Failed:", errorInfo);
      });
  };

  const props = {
    maxCount: 1,

    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

    const onFinish = (values) => {
        console.log("Success:", values);
        setVideoInfo({
            name: values.name,
            desc: values.desc,
        });
    };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="upload-page">
      {/* 修改上传视频的name,desc */}
      <Form
        form={form}
        className="upload-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        style={{
          maxWidth: 430,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="视频名称"
          name="name"
          className="upload-form-item"
          rules={[
            {
              required: true,
              message: "请输入视频名称！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="视频描述"
          name="desc"
          rules={[
            {
              required: true,
              message: "请输入视频描述！",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>

      <Upload {...props} className="upload-select">
        <Button icon={<UploadOutlined />}>选择视频</Button>
      </Upload>

      <Button
        className="upload-button"
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? "Uploading" : "上传"}
      </Button>
    </div>
  );
}

export default VideoUpload;
