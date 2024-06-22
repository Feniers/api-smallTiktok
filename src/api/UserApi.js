import { message } from "antd";
import api from "./api";

export async function getInfo() {
  // try {
  //   const response = await api.get("/getInfo");
  //   return response.data;
  // } catch (error) {
  //   // message.error("获取用户信息失败:", error);
  //   console.error("获取用户信息失败:", error);
  //   throw error;
  // }
  // await api
  //   .get("/getInfo")
  //   .then((response) => {
  //     console.log("getInfo response", response);
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     // message.error("获取用户信息失败:", error);
  //     throw error;
  //   });

  // await api
  //   .get("/getInfo")
  //   .then((response) => {
  //     console.log("getInfo response", response);
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     // message.error("获取用户信息失败:", error.msg);
  //     console.error("获取用户信息失败:", error);
  //     return null;
  //   });

  try {
    const response = await api.get("/getInfo");
    return response.data;
  } catch (error) {
    // console.error("获取用户信息失败:", error);
    console.log("获取用户信息失败:", error);
    return null;
  }
}

export async function register(user) {
  try {
    const response = await api.post("/register", user);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", { username, password });

    const token = response.data.data;

    api.defaults.headers.common["token"] = token;

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
