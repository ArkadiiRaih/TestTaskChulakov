import React, { useState } from "react";
import { connect } from "react-redux";
import { changeFilter } from "../actions/filterActions";
import { findName } from "../utilities";

function Search({ searchTerm, changeFilter, people }) {
  const [term, setTerm] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!term) return;

    if (changeFilter) changeFilter({ searchTerm: term });
    setTerm("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="search"
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <button type="submit">find</button>
      {term === "" ? null : (
        <ul className="suggestions">
          {findName(people, term)
            .slice(0, 10)
            .map((name, idx) => {
              const regex = new RegExp(term, "gi");
              const match = name.match(regex)[0];
              return (
                <li
                  key={`${name}-${idx}`}
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

const mapStateToProps = ({ filter, people }) => ({
  searchTerm: filter.searchTerm,
  people: people.people
});
const mapDispatchToProps = {
  changeFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
