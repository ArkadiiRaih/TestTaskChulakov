import React, { forwardRef, useState } from "react";

function PlayerControls(
  {
    scrub,
    handleVolume,
    toggleFullScreen,
    volume,
    togglePlay,
    progress,
    paused
  },
  ref
) {
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div className="player__controls">
      <div
        className="progress"
        ref={ref}
        onMouseDown={() => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseMove={e => mouseDown && scrub(e)}
        onClick={e => scrub(e)}
      >
        <div
          className="progress__filled"
          style={{ flexBasis: `${progress}%` }}
        ></div>
      </div>
      <button className="player__button toggle" onClick={togglePlay}>
        {paused ? "►" : "❚❚"}
      </button>
      <input
        type="range"
        name="volume"
        className="player__slider"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={handleVolume}
        onClick={handleVolume}
      />
      <button
        className={`player__button fullScreen`}
        onClick={toggleFullScreen}
      ></button>
    </div>
  );
}

export default forwardRef(PlayerControls);
