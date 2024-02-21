const { Composer } = require("telegraf");
const composer = new Composer();
const { mainInlineKey } = require("../../keyboards/inline/main");
const { callbackFilter, textFilter } = require("../../filters/custom");

composer.on(
  [callbackFilter((data) => data === "home"), textFilter((text) => true)],
  async (ctx) => {
    await ctx.reply(
      "Kerakli bo'limni tanlang:\nPastdagi kanal <i>ixtiyoriy(<u>obuna bo'lish shart emas</u>)</i>",
      { reply_markup: mainInlineKey.reply_markup, parse_mode: "HTML" }
    );
    if (ctx.update.callback_query) {
      await ctx.deleteMessage();
    }
  }
);

module.exports = composer;
