const { join: path } = require("path");

const fancyText = require("../../utils/app/fancy-text-gen");
// const nameToImg = require("../../utils/app/names");

const { Composer } = require("telegraf");
const composer = new Composer();

const stateFilter = require("../../filters/stateFilter");
const fancyTextState = require("../../states/fancy-text");
// const namesState = require("../../states/names");

composer.on(stateFilter(fancyTextState.type), async (ctx) => {
  const result = await fancyText[ctx.state.data.type](ctx.update.message.text);
  await ctx.reply(result);
  ctx.state.end();
});

module.exports = composer;
