const stateFilter = (state = '-') => (update) => {
    console.log({state});
    console.log({state2: update.state});
    if (state == "-") {
    return update.state===state
  }
    console.log('filter:', state === update.state);
    return state === update.state;
};

module.exports = stateFilter;
