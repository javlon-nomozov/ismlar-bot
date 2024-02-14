const { join: path } = require("path");
const { whiteheadBoy: nameToImg } = require("../../utils/app/names");
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
const { mainInlineKey } = require("../../keyboards/inline/main");

composer.on("message", async (ctx) => {
  ctx.reply(
    "Kerakli bo'limni tanlang:\nPastdagi kanal <i>ixtiyoriy(<u>obuna bo'lish shart emas</u>)</i>",
    { reply_markup: mainInlineKey.reply_markup, parse_mode: "HTML" }
  );
});

module.exports = composer;
