const stateFilter = (state = '-') => (update) => {
    if (state == "-") {
    return update.state===state
  }
    return state === update.state;
};

module.exports = stateFilter;
