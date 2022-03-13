const sortByProperty = (array = [], property) => array
  .sort((curr, next) => `${next[property]}` > `${curr[property]}` ? 1 : -1);

export {
  sortByProperty
}