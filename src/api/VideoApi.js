// src/api/videoService.js
import axios from "axios";

const initList = [
  {
    id: 1,
    title: "Video 1",
    // 视频地址为public目录下的video1.mp4
    ossUrl: "/1.mp4",
  },
  {
    id: 2,
    title: "Video 2",
    // ossUrl: "https://your-oss-url.com/video2.mp4",
    ossUrl:
      "https://video152596.oss-cn-beijing.aliyuncs.com/a2e4ff5d-6539-400f-8e5a-f281edc02024.mp4",
  },
  {
    id: 3,
    title: "Video 3",
    // ossUrl: "https://your-oss-url.com/video3.mp4",
    ossUrl: "/2.mp4",
  },
];

const API_BASE_URL = "https://mock.apipark.cn/m1/2987016-0-default";

export const fetchVideoList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);
    console.log("response.data", response.data);
    return response.data.data || initList;
    // return initList;
  } catch (error) {
    console.error("Error fetching video list:", error);
    throw error;
  }
};

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/video-details/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching video details for video ID ${videoId}:`,
      error
    );
    throw error;
  }
};

export const likeVideo = async (likeList) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/like`, {
      likeList,
    });
    return response.data;
  } catch (error) {
    console.error("Error liking video:", error);
    throw error;
  }
};

// 其他API请求函数...
