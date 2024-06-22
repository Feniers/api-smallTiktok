// api.js
import { message } from "antd";
import axios from "axios";

// const API_BASE_URL = "https://mock.apipark.cn/m1/2987016-0-default";
// const API_BASE_URL = "http://localhost:8089";
const API_BASE_URL = "http://192.168.10.165:8089";

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL, // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时设置，单位毫秒
});

// 设置默认请求头
api.defaults.headers.common["Content-Type"] = "application/json";

// Add a request interceptor to include token if available in local storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling responses
api.interceptors.response.use(
  (response) => {
    // Check if response indicates an error based on your API's response structure
    if (response.data && response.data.code !== 1) {
      // message.error(response.data.msg || "未知错误");
      return Promise.reject(response.data); // Reject promise to handle error in calling function
    }
    return response; // Return response for successful cases
  },
  (error) => {
    // Handle network errors or other generic errors
    // if (error.response) {
    //   // The request was made and the server responded with a status code that falls out of the range of 2xx
    //   message.error(error.response.data.message || "请求失败");
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   message.error("无响应");
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   message.error(error.message || "未知错误");
    // }
    return Promise.reject(error); // Reject promise to handle error in calling function
  }
);

export default api;
