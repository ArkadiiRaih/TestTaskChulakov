import { SET_FILTER } from "../actions/filterActions";

const defaultFilter = {
  sortBy: "id",
  order: "asc",
  view: "table",
  searchTerm: ""
};

const filterReducer = (filter = defaultFilter, action) => {
  if (action.type === SET_FILTER) {
    return { ...filter, ...action.payload };
  }
  return filter;
};

export default filterReducer;
