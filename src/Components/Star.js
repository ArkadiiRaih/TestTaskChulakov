import React from "react";
import { connect } from "react-redux";

import { toggleFavourite } from "../actions/peopleActions";

function Star({ id, favourite, toggleFavourite }) {
  return (
    <div className="rating">
      <input
        type="checkbox"
        name="rating"
        id={id}
        checked={favourite}
        onChange={() => toggleFavourite(id)}
      />
      <label htmlFor={id}></label>
    </div>
  );
}

const mapDispatchToProps = {
  toggleFavourite
};

export default connect(null, mapDispatchToProps)(Star);
