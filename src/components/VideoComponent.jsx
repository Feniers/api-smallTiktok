// src/components/VideoComponent.js
import React, { useRef } from "react";

const VideoComponent = ({ src, onEnded }) => {
  const videoRef = useRef(null);

  return (
    <video
      ref={videoRef}
      src={src}
      // controls
      onEnded={onEnded}
      autoPlay
      style={{ maxWidth: "100%", maxHeight: "100%", height: "100%" }}
    />
  );
};

export default VideoComponent;
