const { join: path } = require("path");

const imgNameKeys = require("../../keyboards/inline/imgNameKeys");

const { Composer } = require("telegraf");
const composer = new Composer();

// import filters
const stateFilter = require("../../filters/stateFilter");
const { callbackFilter } = require("../../filters/custom");

// import state
const namesState = require("../../states/names");

// import apps
const nameToImg = require("../../utils/app/names");

const namesToImgFunctions = Object.keys(nameToImg);

// handlers
// composer.start((ctx, next) => {
//   // Extract parameters from the deep link
//   const parameters = ctx.payload;
//   console.log({ parameters });
//   if (parameters === "" || parameters === undefined) {
//     return next();
//   }
//   console.log(
//     allAppFunctions.map((el) => `https://t.me/ffeco_bot?start=${el}`)
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

// composer.on(
//   callbackFilter((data) => data === "imgNames" || data === "names_1"),
//   (ctx) => {
//     const data = ctx.update.callback_query.data;
//     if (data.startsWith("names_")) {
//     }
//     ctx.editMessageText(
//       "Namuna rasim raqamini tanlang:",
//       imgNameKeys.keyboard1
//     );
//   }
// );

composer.on(
  callbackFilter((data) => data.startsWith("names_")),
  (ctx, next) => {
    const data = ctx.update.callback_query.data;
    let number;
    let image;
    let key;
    if (data === "names_1") {
      number = 1;
      key = imgNameKeys.keyboard1;
      // image = "../asda";
    } else if (data === "names_2") {
      number = 2;
      key = imgNameKeys.keyboard2;
      // image = "../asda";
    } else if (data === "names_3") {
      number = 3;
      key = imgNameKeys.keyboard3;
      // image = "../asda";
    } else {
      return next();
    }
    ctx.replyWithPhoto({ source: path(__dirname, "../../", 'public','images') },{caption: "Namuna rasim raqamini tanlang:", reply_markup: key.reply_markup});
    // ctx.editMessageText();
  }
);

composer.on(
  callbackFilter((data) => namesToImgFunctions.includes(data)),
  (ctx) => {
    ctx.state.setState = namesState;
    ctx.state.data.image = ctx.update.callback_query.data;
    console.log(ctx.state);
    ctx.reply("ism kiriting:");
  }
);

composer.on(stateFilter(namesState.image), async (ctx) => {
  const nameImg = await nameToImg[ctx.state.data.image](
    ctx.update.message.text
  );
  await ctx.reply("Rasmingiz tayyorlanmoqda iltimos biroz kuting").message_id;
  await ctx.replyWithChatAction("upload_photo");
  await ctx.replyWithPhoto({ source: path(__dirname, "../../", nameImg) });
  // ctx.state.end();
});

module.exports = composer;
