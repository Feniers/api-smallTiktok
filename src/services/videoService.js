import { fetchVideoList, likeVideo } from "../api/VideoApi";

class VideoService {
  videoList = [];
  likes = {};

  constructor() {
    console.log("VideoService constructor");
    this.load().then((videoList) => {
      this.videoList = videoList;
      this.initLikes();
    });
  }

  initLikes() {
    this.likes = {};
    this.videoList.forEach((video) => {
      this.likes[video.id] = false;
    });
  }

  async load() {
    try {
      const videoList = await fetchVideoList();
      // this.videoList = videoList;
      // this.initLikes();
      return videoList;
    } catch (error) {
      console.error("Error fetching video list:", error);
      throw error;
    }
  }

  async preLoad() {
    console.log("preLoad");
    console.log("last VideoList", this.videoList);
    await likeVideo(this.likes);
    const videoList = await this.load();
    const newVideoList = [
      this.videoList[this.videoList.length - 1],
      ...videoList,
    ];
    this.videoList = newVideoList;
    this.initLikes();
    console.log("preLoad end");
    console.log("next VideoList", this.videoList);
  }

  getVideoList() {
    return this.videoList;
  }

  getLikes() {
    return this.likes;
  }

  getVideoById(id) {
    return this.videoList.find((video) => video.id === id);
  }

  likeVideo(videoId) {
    this.likes[videoId] = true;
  }

  dislikeVideo(videoId) {
    this.likes[videoId] = false;
  }

  getLikeStatus(videoId) {
    return this.likes[videoId];
  }
}

const videoService = new VideoService();

export default videoService;
