const unionFilters = (...filters) => {
  return (update) => {
    let result = true;
    for (const filter of filters) {
      result *= Boolean(filter(update));
      if (!result) {
        break;
      }
    }
    return Boolean(result);
  };
};
module.exports = unionFilters;
