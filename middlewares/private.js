const { Composer } = require("telegraf");

const composer = new Composer();
composer.use((ctx, next) => {
  console.log("ctx", ctx);
  const chatType = (
    ctx.update.message
      ? ctx.update.message
      : ctx.update.callback_query.message
      ? ctx.update.callback_query.message
      : "error"
  ).chat.type;
  if (chatType === "private") {
    next();
  }
});

module.exports = composer;
