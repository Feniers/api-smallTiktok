import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/VideoPage.css";
import { ServiceContext } from "../contexts/ServiceContext";

function VideoPage() {
  const videoRefs = useRef([]);
  const { video: VideoService } = useContext(ServiceContext);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const fetchInitialData = async () => {
      const videos = await VideoService.load();
      setCurrentVideos(videos);
      setLikes(VideoService.getLikes());
    };
    fetchInitialData();
  }, [VideoService]);

  const handleNextVideo = async () => {
    setDirection("next");
    if (currentIndex === currentVideos.length - 2) {
      await VideoService.preLoad();
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      handleNextVideo();
    } else {
      handlePrevVideo();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      handleNextVideo();
    } else if (event.key === "ArrowUp") {
      handlePrevVideo();
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.classList.add("active");
      if (direction === "next") {
        if (currentIndex > 0) {
          const prevVideo = videoRefs.current[currentIndex - 1];
          if (prevVideo) {
            prevVideo.classList.remove("active");
            prevVideo.classList.add("prev");
          }
        }
      } else if (direction === "prev") {
        if (currentIndex < currentVideos.length - 1) {
          const nextVideo = videoRefs.current[currentIndex + 1];
          if (nextVideo) {
            nextVideo.classList.remove("active");
            nextVideo.classList.add("next");
          }
        }
      }
    }

    return () => {
      if (currentVideo) {
        currentVideo.classList.remove("active", "prev", "next");
      }
    };
  }, [currentIndex, direction]);

  const handleLikeClick = (videoId) => {
    VideoService.likeVideo(videoId);
    setLikes({ ...likes, [videoId]: true });
  };

  return (
    <div className="video">
      <div className="video-container">
        {currentVideos.map((video, index) => {
          console.log("currentIndex", currentIndex);
          console.log("currentVideos", currentVideos);
          return (
            <div
              key={video.id}
              className={`video-wrapper ${
                index === currentIndex
                  ? "active"
                  : index < currentIndex
                  ? "prev"
                  : "next"
              }`}
            >
              <video
                src={video.ossUrl}
                autoPlay
                muted
                ref={(el) => (videoRefs.current[index] = el)}
                className="video-player"
              />
              <div className="video-info">
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                <button
                  className={`like-button ${likes[video.id] ? "liked" : ""}`}
                  onClick={() => handleLikeClick(video.id)}
                >
                  {likes[video.id] ? "❤️" : "♡"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoPage;
