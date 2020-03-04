import React, { useEffect } from "react";

import SortSwitcher from "./SortSwitcher";
import ViewSwitcher from "./ViewSwitcher";
import Views from "./Views";
import LangSwitcher from "./LangSwitcher";

import { fetchPeople } from "../actions/peopleActions";
import { connect } from "react-redux";
import Search from "./Search";
import ViewsClass from "./ViewsClass";

function App({ fetchPeople }) {
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="application">
      <div className="controllers">
        <LangSwitcher />
        <SortSwitcher />
        <ViewSwitcher />
        <Search />
      </div>
      <ViewsClass />
    </div>
  );
}

const mapDispatchToProps = {
  fetchPeople
};

export default connect(null, mapDispatchToProps)(App);
