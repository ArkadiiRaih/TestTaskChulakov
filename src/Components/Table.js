import React, { useRef } from "react";
import { connect } from "react-redux";

import Field from "./Field";
import useScroll from "./useScroll";
import useFilter from "./useFilter";

function Table({ people = [], filter }) {
  const tableRef = useRef(null);
  const showedItems = useScroll(10, people.length, tableRef);
  const filtered = useFilter({ people, filter });

  const sliced = filtered.slice(0, showedItems);

  return (
    <section ref={tableRef} className="table">
      {sliced.map(human => {
        return <Field key={human.id} human={human} />;
      })}
    </section>
  );
}

const mapStateToProps = ({ people, filter }) => ({
  people: people.people,
  isLoading: people.isLoading,
  filter
});

export default connect(mapStateToProps)(Table);
