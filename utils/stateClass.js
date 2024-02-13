const strGen = require("./mist/randomTextGen");

class State {
  id = strGen(7);
  data = {};
  current;
  states;
  constructor(...states) {
    
    this.current = states[0];
    this.states = states;
    if (states.length === 1 && states[0] === "-") {
      this["-"] = "-";
      return;
    }
    for (let i = 0; i < this.states.length; i++) {
      const el = this.states[i];
      if (this[el]) {
        throw new Error(`${el} key exist pls use another name`);
      }
      this[el] = this.id + el;
      this.data[el] = undefined;
    }
  }
  next() {
    let i = this.states.findIndex((el) => el === this.current);
    i++;
    if (i < this.states.length) {
      this.current = this.states[i];
    } else throw new Error("Next state is not exist");
  }
  end() {
    this.data = {};
    this.current = "-";
    this.states = ['-'];
  }
  set setState(state) {
    for (const key of Object.keys(state)) {
      this[key] = state[key];
    }
  }
}


module.exports = State;
