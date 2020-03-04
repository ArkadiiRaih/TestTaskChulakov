import React, { useState } from "react";
import { connect } from "react-redux";

import { Translate, I18n } from "react-redux-i18n";

import { changeFilter } from "../actions/filterActions";
import { findName } from "../utilities";

function Search({ locale, changeFilter, people }) {
  const [term, setTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // if (!term) return;

    if (changeFilter) changeFilter({ searchTerm: term });
    setTerm("");
  };

  const handleClick = e => {
    const { name } = e.target.dataset;
    console.log(e.target);

    if (changeFilter) changeFilter({ searchTerm: name });
    setTerm("");
  };

  // const handleBlur = e => {
  //   console.log("bluuuur");
  //   console.log(e.target);
  //   if (e.target.matches(".suggestions")) return;

  //   setShowSuggestions(false);
  // };

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
    >
      <input
        type="text"
        placeholder={I18n.t("search.find", { locale })}
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit">
        <Translate value="search.search" />
      </button>
      {term === "" ? null : (
        <ul
          className={`suggestions ${
            showSuggestions ? "" : "suggestions_hidden"
          }`}
          onMouseDown={handleClick}
        >
          {findName(people, term)
            .slice(0, 10)
            .map((name, idx) => {
              const regex = new RegExp(term, "gi");
              const match = name.match(regex)[0];
              return (
                <li
                  key={`${name}-${idx}`}
                  data-name={name}
                  dangerouslySetInnerHTML={{
                    __html: name.replace(
                      regex,
                      `<span class="hl">${match}</span>`
                    )
                  }}
                ></li>
              );
            })}
        </ul>
      )}
    </form>
  );
}

const mapStateToProps = ({ filter, people, i18n }) => ({
  searchTerm: filter.searchTerm,
  people: people.people,
  locale: i18n.locale
});
const mapDispatchToProps = {
  changeFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
