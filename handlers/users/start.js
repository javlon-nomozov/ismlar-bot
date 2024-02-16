const { Composer } = require("telegraf");
const composer = new Composer();
const { mainInlineKey } = require("../../keyboards/inline/main");

composer.start((ctx) => {
  ctx.reply(
    "Assalomu alaikum 👋.\n\nKerakli bo'limni tanlang:\nPastdagi kanal <i>ixtiyoriy(<u>obuna bo'lish shart emas</u>)</i>",
    { reply_markup: mainInlineKey.reply_markup, parse_mode: "HTML" }
  );
  ctx.state.end();
});

module.exports = composer;
