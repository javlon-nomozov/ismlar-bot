const { join: path } = require("path");

const { Composer } = require("telegraf");
const composer = new Composer();

// import filters
const stateFilter = require("../../filters/stateFilter");
const {callbackFilter} = require('../../filters/custom')

// import state
const namesState = require("../../states/names");
const fancyTextState = require("../../states/fancy-text");

// import apps
const nameToImg = require("../../utils/app/names");
const fancyText = require("../../utils/app/fancy-text-gen");

// handlers
composer.start((ctx, next) => {
  // Extract parameters from the deep link
  const parameters = ctx.payload;
  console.log({ parameters });
  if (parameters === "" || parameters === undefined) {
    return next();
  }
  console.log(
    Object.keys(nameToImg)
      .concat(Object.keys(fancyText))
      .map((el) => `https://t.me/ffeco_bot?start=${el}`)
  );
  if (Object.keys(nameToImg).includes(parameters)) {
    ctx.state.setState = namesState;
    ctx.state.data.image = parameters;
    console.log(ctx.state);
    ctx.reply("ism kiriting:");
  } else if (Object.keys(fancyText).includes(parameters)) {
    ctx.state.setState = fancyTextState;
    ctx.state.data.type = parameters;
    console.log(ctx.state);
    ctx.reply("text kiriting:");
  } else {
    ctx.reply(
      "Bunday namuna mavjud emas. ushbu kanalga kirib namuna tanlang: https://t.me/+qxUhOLCHSOZjYjFi "
    );
  }
});

composer.on(stateFilter(namesState.image), async (ctx) => {
  const nameImg = await nameToImg[ctx.state.data.image](
    ctx.update.message.text
  );
  await ctx.reply("⏳");
  ctx.reply("Rasmingiz tayyorlanmoqda iltimos biroz kuting").message_id;
  await ctx.replyWithPhoto({ source: path(__dirname, "../../", nameImg) });
  ctx.state.end();
});

module.exports = composer;
