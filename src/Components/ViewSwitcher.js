import React from "react";
import { connect } from "react-redux";

import { changeFilter } from "../actions/filterActions";
import { Translate } from "react-redux-i18n";

function ViewSwitcher({ filter, changeFilter }) {
  const handleChange = e => {
    const value = e.target.value;

    if (changeFilter) changeFilter({ view: value });
  };

  return (
    <section className="viewSwitcher">
      <h3>
        <Translate value="filter.view" />
      </h3>
      <form onChange={handleChange}>
        <div className="radio-group">
          <input
            id="table-option"
            type="radio"
            name="order"
            value="table"
            checked={filter.view == "table"}
          />
          <label htmlFor="table-option">
            <Translate value="filter.table" />
          </label>
          <input
            id="preview-option"
            type="radio"
            name="order"
            value="preview"
            checked={filter.view == "preview"}
          />
          <label htmlFor="preview-option">
            <Translate value="filter.preview" />
          </label>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = { changeFilter };

export default connect(mapStateToProps, mapDispatchToProps)(ViewSwitcher);
