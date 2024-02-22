const StateClass = require("../utils/stateClass");

const stateInit = (ctx, next) => {
  ctx.session = ctx.session || { state: new StateClass("-") };
  ctx.state = ctx.session.state;
  ctx.update.state = ctx.state[ctx.state.current];
  next();
};

console.log(
  "stateInit bilan ishlash uchun undan oldin session middlewareni initialize qiling!!!"
);

module.exports = stateInit;
