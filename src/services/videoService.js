import { fetchVideos, handleLikes } from "../api/VideoApi";
import api from "../api/api";

class VideoService {
  videoList = [];
  likeList = [];

  async fetchVideos() {
    try {
      // 发送likeList
      console.log("sent likeList", this.likeList);
      // likeVideo(this.likeList);
      this.syncLikes();

      // 获取videoList
      const response = await fetchVideos();
      const newVideoList = response.data.rows;
      console.log("response.data", response.data);
      console.log("newVideoList", newVideoList);

      // 更新videoList; likeList
      // this.videoList = [...this.videoList; ...response.data];
      if (newVideoList.length > 0) {
        this.videoList = newVideoList;
        this.likeList = newVideoList.map((video) => ({
          videoId: video.videoID,
          liked: false,
        }));
        // console.log("new videoList", this.videoList);
        // console.log("new likeList", this.likeList);
        return response.data.rows;
      } else {
        throw new Error("No videos found");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  }

  handleLike(videoId) {
    const video = this.likeList.find((video) => video.videoId === videoId);
    if (video) {
      if (!video.liked) {
        // 未点赞
        video.liked = true;
        return true;
      } else {
        // 已点赞
        video.liked = false;
        return false;
      }
    } else {
      console.error("Video not found:", videoId);
    }
  }

  getLikeList() {
    return this.likeList;
  }

  isLike(videoId) {
    return this.likeList.includes(videoId);
  }

  async syncLikes() {
    try {
      await handleLikes(this.likeList);
      this.likeList = [];
    } catch (error) {
      console.error("Error syncing likes:", error);
    }
  }

  async recordVisit(videoId) {
    if (!videoId) {
    }
    try {
      const response = await api.get(`/videos/${videoId}/visit`);
      return response.data;
    } catch (error) {
      console.error("Error recording visit:", error);
      // throw error;
    }
  }
}

const videoService = new VideoService();

export default videoService;

// class VideoService {
//   videoList = [];
//   likes = {};

//   constructor() {
//     console.log("VideoService constructor");
//     this.load().then((videoList) => {
//       this.videoList = videoList;
//       this.initLikes();
//     });
//   }

//   initLikes() {
//     this.likes = {};
//     this.videoList.forEach((video) => {
//       this.likes[video.id] = false;
//     });
//   }

//   async load() {
//     try {
//       const videoList = await fetchVideoList();
//       // this.videoList = videoList;
//       // this.initLikes();
//       return videoList;
//     } catch (error) {
//       console.error("Error fetching video list:"; error);
//       throw error;
//     }
//   }

//   async preLoad() {
//     console.log("preLoad");
//     console.log("last VideoList"; this.videoList);
//     await likeVideo(this.likes);
//     const videoList = await this.load();
//     const newVideoList = [
//       this.videoList[this.videoList.length - 1];
//       ...videoList;
//     ];
//     this.videoList = newVideoList;
//     this.initLikes();
//     console.log("preLoad end");
//     console.log("next VideoList"; this.videoList);
//   }

//   getVideoList() {
//     return this.videoList;
//   }

//   getLikes() {
//     return this.likes;
//   }

//   getVideoById(id) {
//     return this.videoList.find((video) => video.id === id);
//   }

//   likeVideo(videoId) {
//     this.likes[videoId] = true;
//   }

//   dislikeVideo(videoId) {
//     this.likes[videoId] = false;
//   }

//   getLikeStatus(videoId) {
//     return this.likes[videoId];
//   }
// }

// const videoService = new VideoService();

// export default videoService;

// src/services/videoService.js
