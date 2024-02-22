const { join: path } = require("path");
const { Composer } = require("telegraf");
const { staffFilter, botAdminFilter } = require("../../filters/chat");
const { commandFilter } = require("../../filters/custom");
const {
  makeUserAdmin,
  deleteUserAdmin,
  getAllAdmin,
  closeDatabase,
} = require("../../utils/db/database");
const { bot } = require("../../loader");
const composer = new Composer();

composer.on(commandFilter("show_database", "$"), async (ctx, next) => {
  if (!(await botAdminFilter(ctx.update))) {
    return next();
  }
  try {
    await ctx.telegram.sendDocument(ctx.from.id, {
      source: path(__dirname, "../../", "database.db"),
      filename: `${new Date()}.db`,
      // filename: "database.db",
    });
  } catch (error) {
    console.log(error);
  }
});

composer.on(commandFilter("add_admin", "$"), async (ctx, next) => {
  if (!(await botAdminFilter(ctx.update))) {
    return next();
  }
  const userId = ctx.update.message.text
    .replace("$add_admin", "")
    .replaceAll(" ", "")
    .replaceAll("\n", "");
  try {
    await makeUserAdmin(userId);
    try {
      const chat = await bot.telegram.getChat(userId);
      await ctx.reply(
        `${chat.first_name} ismli foydalanuvchi admin etib tayinlandi.`
      );
    } catch (error) {
      await ctx.reply(`${userId} IDli foydalanuvchi topilmadi.${error}`);
    }
  } catch (error) {
    await ctx.reply(`Xatolik: ${error}`);
  }
});

composer.on(commandFilter("del_admin", "$"), async (ctx, next) => {
  if (!(await botAdminFilter(ctx.update))) {
    return next();
  }
  const userId = ctx.update.message.text
    .replace("$del_admin", "")
    .replaceAll(" ", "")
    .replaceAll("\n", "");
  try {
    await deleteUserAdmin(userId);
    try {
      const chat = await bot.telegram.getChat(userId);
      await ctx.reply(
        `${chat.first_name} ismli foydalanuvchi adminlikdan olindi.`
      );
    } catch (error) {
      await ctx.reply(`${userId} IDli foydalanuvchi adminlikdan olindi.`);
    }
  } catch (error) {
    await ctx.reply(`Xatolik: ${error}`);
  }
});

composer.on(commandFilter("show_admins", "$"), async (ctx, next) => {
  if (!(await staffFilter(ctx.update))) {
    return next();
  }

  const admins = await getAllAdmin();
  let text = "Adminlar: ";
  admins.forEach((el) => (text += `\nid: <code>${el.id}</code>`));
  ctx.reply(text, { parse_mode: "HTML" });
});

module.exports = composer;
