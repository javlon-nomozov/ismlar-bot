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
  await ctx.reply(
    "Ushbu kanallardan keraklisiga kirib namuna tanlang:\nBu reklama emas va ularga obuna bo'lishingiz shart emas",
    mainInlineKey
  );
});

module.exports = composer;
