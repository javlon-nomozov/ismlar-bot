const { Composer } = require("telegraf");
const composer = new Composer();
const { inlineKeyboard } = require("./../../keyboards/inline/example");

composer.start((ctx) => {
  // Extract parameters from the deep link
  const parameters = ctx.startPayload;
  const botUsername = ctx.botInfo.username;
  const deepLink = `https://t.me/${botUsername}?start=restart`;
  // console.log(message(['text'])(ctx.update));
  ctx.reply(
    `Welcome! Type /help for assistance.\n\nClick the link to know how deep link wors: ${deepLink}\nStarted with parameters: ${parameters}`,
    inlineKeyboard
  );
});

module.exports = composer;
