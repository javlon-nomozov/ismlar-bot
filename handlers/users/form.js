const { Composer } = require("telegraf");
const { message } = require("telegraf/filters");
const composer = new Composer();
const { adminFilter, privateFilter } = require("../../filters/chat");
const unionFilters = require("../../utils/unionFilters");
const {
  commandFilter,
  hashtagFilter,
  textFilter,
} = require("../../filters/custom");

composer.on(unionFilters(commandFilter("add", "$"), privateFilter), (ctx) => {
  if (!ctx.session.count) {
    ctx.session.count = 1;
  }
  console.log(ctx.session.count);
  const count = ++ctx.session.count;
  ctx.reply(`${count}`);
});

`audio,
channel_chat_created
contact
document
game
location
photo
sticker
text
video
voice`;
composer.on(message("audio"), (ctx) => ctx.reply(`Audio fayl qabul qilindi`));
composer.on(message("voice"), (ctx) =>
  ctx.reply(`Ovozli xabar fayl qabul qilindi`)
);
composer.on(message("contact"), (ctx) => ctx.reply(`Kontakt qabul qilindi`));
composer.on(message("dacument"), (ctx) => ctx.reply(`Fayl qabul qilindi`));
composer.on(message("game"), (ctx) => ctx.reply(`O'yin qabul qilindi`));
composer.on(message("location"), (ctx) =>
  ctx.reply(`Joylashuv malumotlari qabul qilindi`)
);
composer.on(message("photo"), (ctx) => ctx.reply(`Rasm fayli qabul qilindi`));

module.exports = composer;
