import React, { useRef } from "react";
import { connect } from "react-redux";

import Field from "./Field";
import useScroll from "./useScroll";
import useFilter from "./useFilter";
import Fade from "react-reveal/Fade";

function Table({ people = [], filter }) {
  const tableRef = useRef(null);
  const showedItems = useScroll(20, people.length, tableRef, 20);
  const filtered = useFilter({ people, filter });

  const sliced = filtered.slice(0, showedItems);

  return (
    <section ref={tableRef} className="table">
      {sliced.map(human => {
        return (
          <Fade bottom>
            <Field key={human.id} human={human} />
          </Fade>
        );
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
