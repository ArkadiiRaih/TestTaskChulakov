import React from "react";

import { changeFilter } from "../actions/filterActions";
import { connect } from "react-redux";
import { Translate } from "react-redux-i18n";

function SortSwitcher({ filter, changeFilter }) {
  const hanldeChange = e => {
    const { name, value } = e.target;
    if (changeFilter) changeFilter({ [name]: value });
  };

  return (
    <section className="sortSwitcher">
      <h3>
        <Translate value="filter.sort" />
      </h3>
      <form onChange={hanldeChange}>
        <div className="radio-group">
          <input
            id="id-option"
            type="radio"
            name="sortBy"
            value="id"
            checked={filter.sortBy == "id"}
          />
          <label htmlFor="id-option">
            <Translate value="filter.id" />
          </label>
          <input
            id="name-option"
            type="radio"
            name="sortBy"
            value="name"
            checked={filter.sortBy == "name"}
          />
          <label htmlFor="name-option">
            <Translate value="filter.name" />
          </label>
          <input
            id="age-option"
            type="radio"
            name="sortBy"
            value="age"
            checked={filter.sortBy == "age"}
          />
          <label htmlFor="age-option">
            <Translate value="filter.age" />
          </label>
        </div>
        <div className="radio-group">
          <input
            id="asc-option"
            type="radio"
            name="order"
            value="asc"
            checked={filter.order == "asc"}
          />
          <label htmlFor="asc-option">
            <Translate value="filter.asc" />
          </label>
          <input
            id="desc-option"
            type="radio"
            name="order"
            value="desc"
            checked={filter.order == "desc"}
          />
          <label htmlFor="desc-option">
            <Translate value="filter.desc" />
          </label>
        </div>
      </form>
    </section>
  );
}

const mapStateToProps = ({ filter, i18n }) => ({ filter, locale: i18n.locale });
const mapDispatchToProps = { changeFilter };

export default connect(mapStateToProps, mapDispatchToProps)(SortSwitcher);
