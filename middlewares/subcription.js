const { Composer, Markup } = require("telegraf");
const { allAdmins, allChats } = require("../data/conf");

const composer = new Composer();
composer.use(async (ctx, next) => {
  const chats = await allChats();
  let joined = true;
  const buttons = [];
  for (let e = 0; e < chats.length; e++) {
    const chatUsername = chats[e].name;
    const message = ctx.update.message
      ? ctx.update.message
      : ctx.update.callback_query;
    try {
      // Get the chat ID of the group using its username
      const chat = await ctx.telegram.getChat(chatUsername);
      const chatId = chat.id;
      // Get the chat members
      const member = await ctx.telegram.getChatMember(chatId, message.from.id);
      if (
        member.status === "member" ||
        member.status === "administrator" ||
        member.status === "creator"
      ) {
        joined *= true;
      } else {
        buttons.push([Markup.button.url(chat.title, chat.invite_link)]);
        joined *= false;
      }
    } catch (error) {
      const admins = await allAdmins();
      if (admins[0]) {
        ctx.sendMessage(
          `Chat malumotlarini olishda muammo: chat=${chatUsername} error:${error}`,
          { chat_id: admins[0] }
        );
      }
    }
  }
  if (!joined) {
    ctx.reply(
      "Ushbu chatlarga azo bo'lishingiz kerak",
      Markup.inlineKeyboard(buttons)
    );
  } else next();
});

module.exports = composer;
