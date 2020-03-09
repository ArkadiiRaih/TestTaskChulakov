import React, { useState, useRef } from "react";
import PlayerControls from "./PlayerControls";

function Player({ video, handleClick }) {
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const ref = useRef(null);
  const progressRef = useRef(null);

  function scrub(e) {
    const video = ref.current;
    const { offsetX } = e.nativeEvent;
    const scrubTime =
      (offsetX / progressRef.current.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  const togglePlay = () => {
    const video = ref.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setPaused(paused => !paused);
  };

  function handleProgress() {
    const video = ref.current;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  }

  const handleVolume = e => {
    // console.log(e.target.value);
    video = ref.current;
    video.volume = e.target.value;
    setVolume(video.volume);
  };

  const toggleFullScreen = () => {
    const video = ref.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
    // setFull(full => !full);
  };

  return (
    <div className="card__side player" onClick={handleClick}>
      <video
        ref={ref}
        src={video}
        muted
        volume="0"
        onTimeUpdate={handleProgress}
        onEnded={() => setPaused(true)}
        onClick={togglePlay}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      ></video>
      <PlayerControls
        ref={progressRef}
        video={ref.current}
        progress={progress}
        paused={paused}
        toggleFullScreen={toggleFullScreen}
        togglePlay={togglePlay}
        paused={paused}
        scrub={scrub}
      />
    </div>
  );
}

export default Player;
