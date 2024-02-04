const StateClass = require('../utils/stateClass')

const stateInit = () => (ctx, next) => {
  // console.log('ctx.session:',ctx.session);
  ctx.session = ctx.session || { state: new StateClass('-') };
  // console.log(ctx.session.state);
  ctx.state = ctx.session.state;
  ctx.update.state = ctx.state[ctx.state.current];
  console.log('ctx.state:',ctx.state);
  next();
};

console.log(
  "stateInit bilan ishlash uchun undan oldin session middlewareni initialize qiling!!!"
);

module.exports = stateInit;
