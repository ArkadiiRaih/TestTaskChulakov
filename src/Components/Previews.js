import React, { useRef, useMemo } from "react";
import Preview from "./Preview";
import { connect } from "react-redux";

import useScroll from "./useScroll";
import useFilter from "./useFilter";

function Previews({ people = [], filter }) {
  const previewsRef = useRef(null);
  const filtered = useFilter({ people, filter });

  const showedItems = useScroll(
    filtered.length > 10 ? 10 : filtered.length,
    filtered.length,
    previewsRef,
    10
  );

  const sliced = useMemo(() => {
    return filtered.slice(0, showedItems);
  }, [showedItems, filtered]);

  return (
    <section ref={previewsRef} className="Previews">
      {sliced.map(human => (
        <Preview key={human.id} human={human} />
      ))}
    </section>
  );
}

const mapStateToProps = ({ people, filter }) => ({
  people: people.people,
  isLoading: people.isLoading,
  filter
});

export default connect(mapStateToProps)(Previews);
