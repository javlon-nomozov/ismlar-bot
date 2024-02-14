const { Composer } = require("telegraf");
const composer = new Composer();
const { mainInlineKey } = require("../../keyboards/inline/main");
const nameToImg = require("../../utils/app/names");
const fancyText = require("../../utils/app/fancy-text-gen");

const namesState = require("../../states/names");
const fancyTextState = require("../../states/fancy-text");

// composer.start((ctx, next) => {
//   // Extract parameters from the deep link
//   const parameters = ctx.payload;
//   console.log({ parameters });
//   if (parameters === "" || parameters === undefined) {
//     return next();
//   }
//   console.log(
//     Object.keys(nameToImg)
//       .concat(Object.keys(fancyText))
//       .map((el) => `https://t.me/ffeco_bot?start=${el}`)
//   );
//   if (Object.keys(nameToImg).includes(parameters)) {
//     ctx.state.setState = namesState;
//     ctx.state.data.image = parameters;
//     console.log(ctx.state);
//     ctx.reply("ism kiriting:");
//   } else if (Object.keys(fancyText).includes(parameters)) {
//     ctx.state.setState = fancyTextState;
//     ctx.state.data.type = parameters;
//     console.log(ctx.state);
//     ctx.reply("text kiriting:");
//   } else {
//     ctx.reply(
//       "Bunday namuna mavjud emas. ushbu kanalga kirib namuna tanlang: https://t.me/+qxUhOLCHSOZjYjFi "
//     );
//   }
// });

composer.start((ctx) => {
  ctx.reply(
    "Assalomu alaikum 👋.\n\nKerakli bo'limni tanlang:\nPastdagi kanal <i>ixtiyoriy(<u>obuna bo'lish shart emas</u>)</i>",
    { reply_markup: mainInlineKey.reply_markup, parse_mode: "HTML" }
  );
  ctx.state.end()
});

module.exports = composer;
