const { Composer } = require("telegraf");

const composer = new Composer();
composer.use((ctx, next) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
});

module.exports = composer;
