import React, { useEffect, useState } from "react";
import { PREVIEW_VIEW } from "../actions/filterActions";
import Previews from "./Previews";
import Table from "./Table";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { changeFilter } from "../actions/filterActions";
import Loader from "./Loader";

function Views({ filter, changeFilter, isLoading }) {
  const { view, sortBy, order, searchTerm } = filter;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = Array.from(query.values());

    if (params.length !== 0) {
      const [view, sortBy, order, searchTerm] = params;
      changeFilter({ view, sortBy, order, searchTerm });
    }
  }, []);

  useEffect(() => {
    history.push(
      `/?view=${view}&&sortBy=${sortBy}&&order=${order}&&searchTerm=${searchTerm}`
    );
  }, [view, sortBy, order, searchTerm]);

  if (isLoading) return <Loader />;

  return <>{view === PREVIEW_VIEW ? <Previews /> : <Table />}</>;
}

const mapStateToProps = ({ filter, people }) => ({
  filter,
  isLoading: people.isLoading
});
const mapDispatchToProps = { changeFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Views);
