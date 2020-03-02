import React from "react";
import Star from "./Star";

import { translateAge } from "../utilities";

import images from "../assets/images/*.svg";
import videos from "../assets/videos/*.mp4";
import { Translate } from "react-redux-i18n";

function Preview({ human = {}, style }) {
  const { id, name, image, age, favourite, phrase, video, phone } = human;
  return (
    <article className={`human-preview col_${video ? "2" : "1"}`} style={style}>
      <div className={`card col_${video ? "1" : "2"}`}>
        <div className="card__header">
          <img className="avatar" src={images[image]} />
          <p className="name">{name}</p>
          <Star id={id} favourite={favourite} />
        </div>
        <div className="card__body">
          <p className="age">
            {age} <Translate value={translateAge(age)} />
          </p>
          <p>{phone}</p>
          <p>{phrase}</p>
        </div>
      </div>
      {video ? (
        <div className="card__side">
          <video src={videos[video]} controls></video>
        </div>
      ) : null}
    </article>
  );
}

export default Preview;
