export const SET_FAVOURITE = "SET_FAVOURITE";
export const FETCH_PEOPLE = "FETCH_PEOPLE";
export const FULLFILLEd_PEOPLE = "FULLFILLED_PEOPLE";

import defaultPeople from "../defaultState.json";

export const toggleFavourite = id => {
  return {
    type: SET_FAVOURITE,
    payload: { id }
  };
};

export const peoplePending = () => {
  return {
    type: FETCH_PEOPLE
  };
};

export const peopleFullfilled = people => {
  return {
    type: FULLFILLEd_PEOPLE,
    payload: { people }
  };
};

export const fetchPeople = () => {
  return dispatch => {
    dispatch(peoplePending());
    return setTimeout(() => dispatch(peopleFullfilled(defaultPeople)), 1000);
  };
};
