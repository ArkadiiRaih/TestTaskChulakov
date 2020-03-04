import {
  SET_FAVOURITE,
  FETCH_PEOPLE,
  FULLFILLEd_PEOPLE
} from "../actions/peopleActions";

const peopleReducer = (people = { people: [], isLoading: false }, action) => {
  if (action.type === SET_FAVOURITE) {
    const humanId = people.people.findIndex(
      human => human.id === action.payload.id
    );
    const oldHuman = people.people[humanId];
    const newHuman = { ...oldHuman, favourite: !oldHuman.favourite };
    const newPeople = [...people.people];
    newPeople.splice(humanId, 1, newHuman);
    return { ...people, ["people"]: newPeople };
  }
  if (action.type === FETCH_PEOPLE) {
    return {
      ...people,
      isLoading: true
    };
  }
  if (action.type === FULLFILLEd_PEOPLE) {
    return {
      ...people,
      isLoading: false,
      people: action.payload.people
    };
  }
  return people;
};

export default peopleReducer;
