const sortOptions = {
  asc: sortBy => (a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
    return 0;
  },
  desc: sortBy => (a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return -1;
    }
    return 0;
  }
};

export const sort = (option, sortBy, array) =>
  [...array].sort((a, b) => {
    return sortOptions[option](sortBy)(a, b);
  });

export const translateAge = age => {
  const lastDigit = age % 10;
  if (lastDigit === 1) {
    return "human.year";
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return "human.years_1";
  }
  return "human.years_2";
};

export const find = (people, searchTerm) => {
  return people.filter(human => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(searchTerm, "gi");
    return human.name.match(regex);
  });
};

export const findName = (people, searchTerm) => {
  return find(people, searchTerm).map(human => human.name);
};
