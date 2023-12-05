import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isEnd, setIsEnd] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({
    width: "100",
    height: "100",
  });
  useEffect(() => {
    const handleResize = () => {
      // You can adjust the video size according to your responsive design needs.
      // For example, you can make it responsive to the container's width.
      const containerWidth = window.innerWidth / 3;
      const containerHeight = window.innerWidth * 0.5625;

      setVideoDimensions({
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      });
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Initialize the dimensions on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [videoId]);

  const videoOptions = {
    height: videoDimensions.width,
    width: videoDimensions.height,
    playerVars: {
      autoplay: 0, // Set to 1 if you want the video to autoplay
      rel: 0,
      showinfo: 0,
      ecver: 2,
    },
  };

  const onReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo(); // You can remove this line if you want the video to autoplay
  };

  return (
    <div>
      <YouTube
        videoId={videoId}
        opts={videoOptions}
        onReady={onReady}
        // onPlay={() => setIsPlaying(true)}
        // onPause={() => setIsPlaying(false)}
        // onEnd={() => setIsEnd(true)}
      />
      {/* {isPlaying ? <p>Video is playing</p> : <p>Video is paused</p>}
      {isEnd ? <p>Video has end</p> : <p>Video had not end</p>} */}
    </div>
  );
};

export default VideoPlayer;
