import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import { PREVIEW_VIEW } from "../actions/filterActions";
import Previews from "./Previews";
import Table from "./Table";
import { changeFilter } from "../actions/filterActions";
import Loader from "./Loader";

class Views extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  get urlParams() {
    const query = new URLSearchParams(this.props.location.search);
    return Array.from(query.values());
  }

  createUrlString(view, sortBy, order, searchTerm) {
    return `/?view=${view}&&sortBy=${sortBy}&&order=${order}&&searchTerm=${searchTerm}`;
  }

  componentDidMount() {
    const params = this.urlParams;
    if (params.length !== 0) {
      const [view, sortBy, order, searchTerm] = params;
      this.props.changeFilter({ view, sortBy, order, searchTerm });
    } else {
      const { view, sortBy, order, searchTerm } = this.props.filter;
      this.props.history.push(
        this.createUrlString(view, sortBy, order, searchTerm)
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { filter: prevFilter } = prevProps;
    const { location: prevLocation } = prevProps;
    const nextFilter = this.props.filter;
    const nextLocation = this.props.location;
    if (
      !isEqual(prevFilter, nextFilter) &&
      isEqual(prevLocation.search, nextLocation.search)
    ) {
      const { view, sortBy, order, searchTerm } = nextFilter;
      this.props.history.push(
        this.createUrlString(view, sortBy, order, searchTerm)
      );
    }
    if (
      !isEqual(prevLocation.search, nextLocation.search) &&
      isEqual(prevFilter, nextFilter)
    ) {
      const [view, sortBy, order, searchTerm] = this.urlParams;
      this.props.changeFilter({ view, sortBy, order, searchTerm });
    }
  }

  render() {
    const { isLoading } = this.props;
    const { view } = this.props.filter;
    if (isLoading) return <Loader />;
    return <>{view === PREVIEW_VIEW ? <Previews /> : <Table />}</>;
  }
}

const mapStateToProps = ({ filter, people }) => ({
  filter,
  isLoading: people.isLoading
});
const mapDispatchToProps = { changeFilter };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Views));
