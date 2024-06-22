import api from "./api";
import userService from "../services/userService";

export async function fetchVideos() {
  try {
    const response = await api.get("/videos/recommend");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    // throw error;
    return [];
  }
}
export async function getVideos(page = 1, pageSize = 10) {
  try {
    const response = await api.get("/videos", {
      params: { page, pageSize, userID: userService.getUser().userId },
    });
    console.log("response11111111111111111111111", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}
export async function handleLikes(likeList) {
  try {
    console.log("api handleLikes");
    if (!userService.getUser().userId) {
      return null;
    }
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

export async function uploadVideo(formData) {

  console.log("formData", formData);
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

export async function deleteVideo(videoId) {
  try {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
}

export async function recordVisit(videoId) {
  try {
    const response = await api.post(`/videos/${videoId}/visit`);
    return response.data;
  } catch (error) {
    console.error("Error recording visit:", error);
    // throw error;
  }
}
