// api.js
import axios from "axios";

// const API_BASE_URL = "https://mock.apipark.cn/m1/2987016-0-default";
const API_BASE_URL = "http://192.168.10.165:8089";

// 创建一个 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL, // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时设置，单位毫秒
});

// 设置默认请求头
api.defaults.headers.common["Content-Type"] = "application/json";

// 如果本地存储中有 token，则将其添加到请求头中
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["token"] = token;
}

export default api;
