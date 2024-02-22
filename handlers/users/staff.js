const { Composer } = require("telegraf");
const { staffFilter } = require("../../filters/chat");
const { commandFilter } = require("../../filters/custom");
const {
  getAllUser,
  createChannel,
  deleteChannel,
  getAllChannel,
  userLeft,
  getCountUsers,
} = require("../../utils/db/database");
const { bot } = require("../../loader");
const composer = new Composer();

composer.on(commandFilter("send_ad", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }
  const users = await getAllUser();
  await sleep(0.2);
  const srcMessage = ctx.update.message.reply_to_message;
  if (srcMessage) {
    let sendCount = 0;
    for (let i = 0; i < users.length; i++) {
      sendCount++;
      const user = users[i];
      try {
        await ctx.forwardMessage(user.id, {
          message_id: srcMessage.message_id,
        });
      } catch (error) {
        await userLeft(user.id);
      }
    }
    await ctx.reply(`Post ${sendCount} ta foydalanuvchiga tarqatildi`);
  } else {
    await ctx.reply("Kerakli xabarni reply qilib buyruqni kiriting");
  }
});

composer.on(commandFilter("del_chat", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }
  const chatId = ctx.update.message.text
    .replace("$del_chat", "")
    .replaceAll(" ", "")
    .replaceAll("\n", "");
  try {
    await deleteChannel(chatId);
    try {
      const chat = await bot.telegram.getChat(chatId);
      await ctx.reply(`${chat.title} nomli chat o'chirildi.`);
    } catch (error) {
      await ctx.reply(`${chatId} IDli chat o'chirildi.`);
    }
  } catch (error) {
    await ctx.reply(`Xatolik: ${error}`);
  }
});

composer.on(commandFilter("add_chat", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }
  const chatId = ctx.update.message.text
    .replace("$add_chat", "")
    .replaceAll(" ", "")
    .replaceAll("\n", "");
  try {
    const chat = await bot.telegram.getChat(chatId);
    try {
      await createChannel(chatId);
      await ctx.reply(`${chat.title} nomli chat qo'shildi.`);
    } catch (error) {
      ctx.reply(
        `Bu chat allaqachon mavjud bo'lishi mumkin.\n\nBatafsil: ${error}`
      );
    }
  } catch (error) {
    await ctx.reply(
      `${chatId} username yoki id li chat malumotlarini olishda muammo bo'lyabdi.\nbot chatga qo'shilganligiga amin bo'ling`
    );
  }
});

composer.on(commandFilter("show_chats", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }

  const chats = await getAllChannel();
  let text = "Chatlar: ";
  chats.forEach((el) => (text += "\n<code>" + el.name + "</code>"));
  ctx.reply(text, { parse_mode: "HTML" });
});

composer.on(commandFilter("count_user", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }
  const countData = await getCountUsers();
  let text = `barchasi: ${countData.all_users}\no'chirilgan: ${countData.deleted}`;
  ctx.reply(text, { parse_mode: "HTML" });
});

module.exports = composer;
