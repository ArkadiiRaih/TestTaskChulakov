import throttle from "lodash/throttle";
import { useEffect } from "react";

function useAutoPlay(videosContainer) {
  const handleVideoScroll = throttle(e => {
    const videos = videosContainer.querySelectorAll("video");
    videos.forEach(video => handlePlayVideo(video));
  }, 100);

  function handlePlayVideo(video) {
    const top = video.getBoundingClientRect().top;
    if (
      window.innerHeight / 2 >= top - 50 &&
      window.innerHeight / 2 <= top + video.offsetHeight + 50
    ) {
      console.log(top);
      if (!video.paused) return;
      togglePlay(video);
    } else {
      if (video.paused) return;
      togglePlay(video);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleVideoScroll);
    () => window.removeEventListener("scroll", handleScroll);
  });

  function togglePlay(video) {
    const method = video.paused ? "play" : "pause";
    video[method]();
  }
}

export default useAutoPlay;
