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

// bu holatda bu filterlardan birortasi to'g'ri kelsaham
// composer.on([commandFilter("start", "$"), adminFilter], (ctx) => {
// bu holatda esa hamma filterlar to'g'ri kelsagina ishlaydi
// composer.on(unionFilters(filter1,filter2), (ctx)=>{
composer.on(
  [
    unionFilters(commandFilter(["config", "settings"], "$"), privateFilter),
    textFilter((text) => text === "hi"),
  ],
  (ctx) => {
    ctx.reply(
      `salom siz shaxsiy chatda $config / $settings admin kommandasini kiritdingiz`
    );
  }
);

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
