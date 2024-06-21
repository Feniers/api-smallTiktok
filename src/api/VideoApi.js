import api from "./api";
import userService from "../services/userService";
import axios from "axios";

const defaultUser = {
  userId: 3,
  username: "wck",
  password: "123456",
};

export async function register(user) {
  try {
    const response = await api.post("/register", user);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export async function login(userId, username, password) {
  try {
    const response = await api.post("/login", { userId, username, password });

    const token = response.data.data;

    api.defaults.headers.common["token"] = token;

    localStorage.setItem("token", token);
    userService.setUser(defaultUser);

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
    // userService.logout();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export async function fetchVideos(page = 1, pageSize = 10) {
  try {
    const response = await api.get("/videos", {
      params: { page, pageSize, userID: userService.getUser().userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

export async function handleLikes(likeList) {
  try {
    const response = await api.post(
      `/likes/batch?userId=${userService.getUser().userId}`,
      likeList
    );
    return response.data;
  } catch (error) {
    console.error("Error liking video:", error);
    throw error;
  }
}

export async function uploadVideo(file) {
  const formData = new FormData();
  formData.append("video", file);

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
  }
}
