import { useMemo } from "react";
import { find, sort } from "../utilities";

function useFilter({ people, filter }) {
  const { order, sortBy, searchTerm } = filter;
  // There is possibility to combine find and filter

  try {
    const filtered = useMemo(
      () => sort(order, sortBy, find(people, searchTerm)),
      [order, sortBy, searchTerm, people]
    );

    return filtered;
  } catch (err) {
    return [];
  }
}

export default useFilter;
