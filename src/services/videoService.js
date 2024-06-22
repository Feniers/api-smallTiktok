import { fetchVideos, handleLikes } from "../api/VideoApi";
import api from "../api/api";

class VideoService {
  videoList = [];
  likeList = [];

  async getData() {
    // try {
    // 发送likeList
    console.log("sent likeList", this.likeList);
    // likeVideo(this.likeList);
    this.syncLikes();

    // 获取videoList
    // const response = await fetchVideos();
    // const newVideoList = response.data;

    // // 更新videoList; likeList
    // // this.videoList = [...this.videoList; ...response.data];
    // if (newVideoList.length > 0) {
    //   this.videoList = newVideoList;
    //   this.likeList = newVideoList.map((video) => ({
    //     videoId: video.videoID,
    //     liked: false,
    //   }));

    //   return response.data;

    const response = await fetchVideos();

    if (response.data.length > 0) {
      this.videoList = response.data;
      this.likeList = this.videoList.map((video) => ({
        videoId: video.videoId,
        liked: false,
      }));
      return this.videoList;
    } else {
      console.error("No videos found");
    }

    // await fetchVideos()
    //   .then((response) => {
    //     const newVideoList = response.data;

    //     // 更新videoList; likeList
    //     if (newVideoList.length > 0) {
    //       this.videoList = newVideoList;
    //       this.likeList = newVideoList.map((video) => ({
    //         videoId: video.videoID,
    //         liked: false,
    //       }));
    //     } else {
    //       throw new Error("No videos found");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.msg);
    //     return [];
    //   });
    // } catch (error) {
    //   console.error("Error fetching videos:", error.msg);
    //   return [];
    // }
  }

  handleLike(videoId) {
    console.log("handleLike", videoId);
    console.log("likeList", this.likeList);
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
