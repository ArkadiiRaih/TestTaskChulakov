export const SET_FILTER = "SET_FILTER";
export const PREVIEW_VIEW = "preview";
export const TABLE_VIEW = "table";

export const changeFilter = filter => {
  return {
    type: SET_FILTER,
    payload: { ...filter }
  };
};
