const { join: path } = require("path");

const imgNameKeys = require("../../keyboards/inline/imgNameKeys");

const { Composer } = require("telegraf");
const composer = new Composer();

// import filters
const stateFilter = require("../../filters/stateFilter");
const { callbackFilter, textFilter } = require("../../filters/custom");
const unionFilters = require("../../utils/unionFilters");

// import state
const namesState = require("../../states/names");

// import apps
const nameToImg = require("../../utils/app/names");

const namesToImgFunctions = Object.keys(nameToImg);

// handlers
composer.on(
  callbackFilter((data) => data.startsWith("names_")),
  async (ctx, next) => {
    const data = await ctx.update.callback_query.data;
    let number;
    let key;
    if (data === "names_1") {
      number = 1;
      key = imgNameKeys.keyboard1;
    } else if (data === "names_2") {
      number = 2;
      key = imgNameKeys.keyboard2;
    } else if (data === "names_3") {
      number = 3;
      key = imgNameKeys.keyboard3;
    } else {
      return next();
    }
    await ctx.replyWithPhoto(
      {
        source: path(
          __dirname,
          "../../",
          "public",
          "images",
          "templates",
          `image${number}.png`
        ),
      },
      {
        caption: "Namuna rasim raqamini tanlang:",
        reply_markup: key.reply_markup,
      }
    );
    await ctx.deleteMessage();
  }
);

composer.on(
  callbackFilter((data) => namesToImgFunctions.includes(data)),
  (ctx) => {
    ctx.state.setState = namesState;
    ctx.state.data.image = ctx.update.callback_query.data;
    ctx.reply("ism kiriting:");
  }
);

composer.on(
  unionFilters(
    stateFilter(namesState.image),
    textFilter(() => true)
  ),
  async (ctx) => {
    const nameImg = await nameToImg[ctx.state.data.image](
      ctx.update.message.text
    );
    await ctx.reply("Rasmingiz tayyorlanmoqda iltimos biroz kuting").message_id;
    await ctx.replyWithChatAction("upload_photo");
    await ctx.replyWithPhoto(
      {
        source: path(__dirname, "../../", nameImg),
      },
      {
        caption: `<b>🤖 @${ctx.botInfo.username} orqali yasaldi</b>`,
        parse_mode: "HTML",
      }
    );
  }
);

module.exports = composer;
