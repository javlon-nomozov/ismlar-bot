const { Composer } = require("telegraf");
const composer = new Composer();
const {defaultKeyboard}=require('./../../keyboards/default/example')

composer.command("help", (ctx) => {
  ctx.reply("This is a help message.",defaultKeyboard);
});
module.exports = composer;
