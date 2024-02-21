const { bot } = require("./loader");
const { allAdmins } = require("./data/conf");

const handlers = require("./handlers/_init");

const middlewares = require("./middlewares/_init");

// My Middlewares
bot.use(middlewares);

// Init handlers
bot.use(handlers);

// notifyAdmin
allAdmins().then((admins) => {
  try {
    bot.telegram.getChat(admins[0]).then((res) => console.log(res));

    // admins.forEach((el) => bot.telegram.sendMessage(el, "Bot ishga tushdi"));
    admins.forEach(async (adminId) => {
      try {
        await bot.telegram.sendMessage(adminId, "Bot is working");
        console.log(`Message sent to admin ${adminId}`);
      } catch (error) {
        console.error(
          `Error while sending message to admin ${adminId}: ${error.message}`
        );
      }
    });
  } catch (error) {}
});

bot.launch();
