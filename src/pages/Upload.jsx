import { Button, Form, Input, Upload, message } from "antd";
import "../css/UploadPage.css";
import { UploadOutlined } from "@ant-design/icons";
import { uploadVideo } from "../api/VideoApi";
import { useState } from "react";

function VideoUpload() {
  console.log("Upload");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    uploadVideo(fileList[0])
      .then((response) => {
        console.log("response", response);
        setUploading(false);
        setFileList([]);
        message.success("Upload successfully");
      })
      .catch((error) => {
        console.error("Failed to upload video: ", error);
        setUploading(false);
        message.error("Upload failed");
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
    // 修改上传视频的name,desc
    const video = fileList[0];
    video.name = values.name;
    video.desc = values.desc;
    console.log("video", video);
    setFileList([video]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="upload-page">
      {/* 修改上传视频的name,desc */}
      <Form
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
