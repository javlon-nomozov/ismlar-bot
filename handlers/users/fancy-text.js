const fancyText = require("../../utils/app/fancy-text-gen");
const { Composer } = require("telegraf");
const composer = new Composer();

const stateFilter = require("../../filters/stateFilter");
const { callbackFilter, textFilter } = require("../../filters/custom");
const fancyTextState = require("../../states/fancy-text");

const fancyTextKeys = require("../../keyboards/inline/fancyTextKeys");
const unionFilters = require("../../utils/unionFilters");

const fancyTextFunctions = Object.keys(fancyText);

// handlers
composer.on(
  callbackFilter((data) => data.startsWith("texts_")),
  (ctx, next) => {
    const data = ctx.update.callback_query.data;
    let number;
    let key;
    number = Number(data.replace("texts_", ""));
    key = fancyTextKeys[`keyboard${number}`];
    ctx.editMessageText("Yoqtirgan shriftingizni tanlang:", key);
  }
);

composer.on(
  callbackFilter((data) => fancyTextFunctions.includes(data)),
  (ctx) => {
    ctx.state.setState = fancyTextState;
    ctx.state.data.type = ctx.update.callback_query.data;
    ctx.reply("Matin yoki ism kiriting:");
  }
);

composer.on(
  unionFilters(
    stateFilter(fancyTextState.type),
    textFilter(() => true)
  ),
  async (ctx) => {
    const result = await fancyText[ctx.state.data.type](
      ctx.update.message.text
    );
    await ctx.reply(
      result + `\n\n<b>🤖 @${ctx.botInfo.username} orqali yasaldi</b>`,
      { parse_mode: "HTML" }
    );
  }
);

module.exports = composer;
