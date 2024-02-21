const { Composer } = require("telegraf");
const composer = new Composer();
const { mainInlineKey } = require("../../keyboards/inline/main");
const { createUser, userRestart } = require("../../utils/db/database");

composer.start(async (ctx) => {
  try {
    const user = ctx.message.from;
    await createUser({ id: user.id, role: "member", coin: 300 });
  } catch (error) {
    await userRestart(ctx.message.from.id);
  }
  try {
    await ctx.reply(
      "Assalomu alaikum 👋.\n\nKerakli bo'limni tanlang:\nPastdagi kanal <i>ixtiyoriy(<u>obuna bo'lish shart emas</u>)</i>",
      { reply_markup: mainInlineKey.reply_markup, parse_mode: "HTML" }
    );
    ctx.state.end();
  } catch (error) {
    console.log("error occured while start command handled:", error);
  }
});

module.exports = composer;
