import React from "react";
import images from "../assets/images/*.svg";

import Star from "./Star";
import { Translate } from "react-redux-i18n";

import { translateAge } from "../utilities";

function Field({ human = {}, style }) {
  const { id, name, image, age, favourite, phone } = human;

  return (
    <div className="field" style={style}>
      <img className="avatar" src={images[image]} />
      <p className="name">{name}</p>
      <p className="age">
        {age} <Translate value={translateAge(age)} />
      </p>
      <p className="phone">{phone}</p>
      <Star id={id} favourite={favourite} />
    </div>
  );
}

export default Field;
