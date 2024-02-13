// const { session } = require("telegraf");

const { bot } = require("./loader");
// const { ADMINS } = require("./data/conf");
// const stateInit = require("./middlewares/stateInitializer");

// const handlers = require("./handlers/_init");

// const logger = require("./middlewares/logger");

// 3rd party Middlewares
// Make session data available
// bot.use(session());

// My Middlewares
// bot.use(logger);
// session middleware must be initialized before state middlewar
// bot.use(stateInit());

// Init handlers
// bot.use(handlers);

// bot.telegram.getChat(ADMINS[0]).then((res) => console.log(res));

// bot.telegram
//   .getUserProfilePhotos(ADMINS[0])
//   .then((result) => {
//     // Access the user profile photos
//     const photos = result.photos;

//     if (photos.length > 0) {
//       // Access the file_id of the first photo
//       const fileId = photos[0][0].file_id;

//       // Access other details or perform further actions as needed
//       console.log(`User ID: ${ADMINS[0]}`);
//       console.log(`File ID of the first photo: ${fileId}`);
//     } else {
//       console.log(`User ID: ${ADMINS[0]} has no profile photos.`);
//     }
//   })
//   .catch((error) => {
//     console.error(`Error getting user profile photos: ${error.message}`);
//   });

// // ADMINS.forEach((el) => bot.telegram.sendMessage(el, "Bot ishga tushdi"));
// ADMINS.forEach(async (adminId) => {
//   try {
//     await bot.telegram.sendMessage(adminId, "Bot is working");
//     console.log(`Message sent to admin ${adminId}`);
//   } catch (error) {
//     console.error(
//       `Error while sending message to admin ${adminId}: ${error.message}`
//     );
//   }
// });

bot.on('message',ctx=>{
  ctx.reply(ctx.update.message.text)
})


bot.launch();
