const { bot } = require("./loader");
const { ADMINS } = require("./data/conf");

const handlers = require("./handlers/_init");

const middlewares = require("./middlewares/_init");

// My Middlewares
bot.use(middlewares);

// Init handlers
bot.use(handlers);

bot.telegram.getChat(ADMINS[0]).then((res) => console.log(res));

// ADMINS.forEach((el) => bot.telegram.sendMessage(el, "Bot ishga tushdi"));
ADMINS.forEach(async (adminId) => {
  try {
    await bot.telegram.sendMessage(adminId, "Bot is working");
    console.log(`Message sent to admin ${adminId}`);
  } catch (error) {
    console.error(
      `Error while sending message to admin ${adminId}: ${error.message}`
    );
  }
});

bot.launch();
