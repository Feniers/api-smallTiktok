import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
} from "react";
import VideoComponent from "../components/VideoComponent";
import "../css/VideoPage.css";
import { ServiceContext } from "../contexts/ServiceContext";

const VideoList = () => {
  const { video: videoService } = useContext(ServiceContext);
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isScrolling = useRef(false);
  const [visitedVideos, setVisitedVideos] = useState(new Set());

  const loadMoreVideos = useCallback(async () => {
    try {
      const newVideos = await videoService.getData();
      console.log("Fetched videos: ", newVideos);
      /*构建一个全是videoId 的一个list*/
      const videoIds = newVideos.map((video) => video.videoId);
      console.log("videoIds", videoIds);
      /*获取这个list里面的点赞状态*/
      // const newLikes = await videoService.fetchLikes(videoIds);
      // console.log("newLikes", newLikes);
      // setLikes((prevLikes) => [...prevLikes, ...newLikes]);
      setLikes(videoService.getLikeList());

      if (newVideos.length === 0) return;
      setVideos((prevVideos) => {
        console.log("prevVideos", prevVideos);
        if (prevVideos.length === 0) return newVideos;
        else if (videos.length === 0) return newVideos;

        return [prevVideos[prevVideos.length - 1], ...newVideos];
      });
      setCurrentIndex(0);
    } catch (error) {
      console.error("Failed to load videos: ", error);
    }
  }, []);

  useEffect(() => {
    loadMoreVideos();
  }, [loadMoreVideos]);

  const handleWheel = (event) => {
    if (isScrolling.current) return;
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 500);

    if (event.deltaY > 0) {
      // 向下滚动
      if (currentIndex < videos.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
      if (currentIndex >= videos.length - 2) {
        loadMoreVideos();
      }
    } else {
      // 向上滚动
      if (currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const handleLike = (videoId) => {
    if (videoService.handleLike(videoId)) {
      // 点赞
      setLikes((prevLikes) => [...prevLikes, videoId]);
      console.log("点赞", videoId);
    } else {
      // 取消点赞
      setLikes((prevLikes) => prevLikes.filter((id) => id !== videoId));
      console.log("取消点赞", videoId);
    }
  };

  // useEffect(() => {
  //   const syncLikesInterval = setInterval(() => {
  //     videoService.syncLikes();
  //   }, 30000);

  //   return () => clearInterval(syncLikesInterval);
  // }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, videos.length, loadMoreVideos, handleWheel]);

  useEffect(() => {
    if (videos.length > 0 && !visitedVideos.has(videos[currentIndex].videoId)) {
      console.log("看过", videos[currentIndex].videoId);
      videoService
        .recordVisit(videos[currentIndex].videoId)
        .then((r) => console.log(r));
      setVisitedVideos((prevVisited) =>
        new Set(prevVisited).add(videos[currentIndex].videoId)
      );
    }
  }, [currentIndex, videos, visitedVideos, videoService]);
  return (
    <div className="video-container">
      {videos.length > 0 && (
        <div style={{ height: "100%" }}>
          {console.log("videos", videos)}
          {console.log("index", currentIndex)}
          {console.log("currentVideo", videos[currentIndex])}

          <VideoComponent src={videos[currentIndex].url} onEnded={() => {}} />
          <div className="video-info">
            <h2>{videos[currentIndex].title}</h2>
            <p>{videos[currentIndex].description}</p>
            {/* <button
              className="like-button"
              onClick={() => handleLike(videos[currentIndex].videoId)}
            >
              {likes.includes(videos[currentIndex].videoId) ? "❤️" : "♡"}
            </button> */}
            <div
              className="like-button"
              onClick={() => handleLike(videos[currentIndex].videoId)}
            >
              {likes.includes(videos[currentIndex].videoId) ? "❤️" : "♡"}
              <p>{videos[currentIndex].likes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoList;
