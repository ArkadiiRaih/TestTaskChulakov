import React, { useRef, useMemo, useEffect, useState } from "react";
import Preview from "./Preview";
import { connect } from "react-redux";

import Fade from "react-reveal/Fade";

import useScroll from "./useScroll";
import useFilter from "./useFilter";
import throttle from "lodash/throttle";

function Previews({ people = [], filter }) {
  const previewsRef = useRef(null);
  const filtered = useFilter({ people, filter });
  const [videoStoped, setVideoStoped] = useState(false);

  const showedItems = useScroll(
    filtered.length > 10 ? 10 : filtered.length,
    filtered.length,
    previewsRef,
    10
  );

  const sliced = useMemo(() => {
    return filtered.slice(0, showedItems);
  }, [showedItems, filtered]);

  const handleVideoScroll = throttle(e => {
    if (!previewsRef.current) return;
    const videos = previewsRef.current.querySelectorAll("video");
    videos.forEach(video => handlePlayVideo(video));
  }, 100);

  function handlePlayVideo(video) {
    const top = video.getBoundingClientRect().top;
    if (
      window.innerHeight / 2 >= top - 50 &&
      window.innerHeight / 2 <= top + video.offsetHeight + 50
    ) {
      if (!video.paused) return;
      togglePlay(video);
    } else {
      if (video.paused) return;
      togglePlay(video);
    }
  }

  useEffect(() => {
    if (!previewsRef.current) return;
    if (!videoStoped) {
      window.addEventListener("scroll", handleVideoScroll, false);
    } else {
      window.removeEventListener("scroll", handleVideoScroll, false);
    }
    return () => window.removeEventListener("scroll", handleVideoScroll, false);
  }, [videoStoped]);

  function togglePlay(video) {
    const method = video.paused ? "play" : "pause";
    video[method]();
  }

  const handleClick = e => {
    setVideoStoped(true);
  };

  return (
    <section ref={previewsRef} className="Previews">
      {sliced.map(human => (
        // <Fade bottom>
        <Preview key={human.id} human={human} handleClick={handleClick} />
        // </Fade>
      ))}
    </section>
  );
}

const mapStateToProps = ({ people, filter }) => ({
  people: people.people,
  isLoading: people.isLoading,
  filter
});

export default connect(mapStateToProps)(Previews);
