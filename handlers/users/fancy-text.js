const { join: path } = require("path");

const fancyText = require("../../utils/app/fancy-text-gen");
// const nameToImg = require("../../utils/app/names");

const { Composer } = require("telegraf");
const composer = new Composer();

const stateFilter = require("../../filters/stateFilter");
const { callbackFilter } = require("../../filters/custom");
const fancyTextState = require("../../states/fancy-text");

const fancyTextKeys = require("../../keyboards/inline/fancyTextKeys");

const fancyTextFunctions = Object.keys(fancyText);

//   } else if (Object.keys(fancyText).includes(parameters)) {
//     ctx.state.setState = fancyTextState;
//     ctx.state.data.type = parameters;
//     console.log(ctx.state);
//     ctx.reply("text kiriting:");
//   } else {

// composer.on(
//   callbackFilter((data) => data === "imgNames" || data === "texts_1"),
//   (ctx) => {
//     const data = ctx.update.callback_query.data;
//     if (data.startsWith("texts_")) {
//     }
//     ctx.editMessageText(
//       "Namuna rasim raqamini tanlang:",
//       fancyTextKeys.keyboard1
//     );
//   }
// );

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
    console.log(ctx.state);
    ctx.reply("Matin yoki ism kiriting:");
  }
);

composer.on(stateFilter(fancyTextState.type), async (ctx) => {
  const result = await fancyText[ctx.state.data.type](ctx.update.message.text);
  await ctx.reply(result);
});

module.exports = composer;
