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

export async function handleLikes(likeList) {
  try {
    console.log("api handleLikes", userService.getUser().userId);
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
