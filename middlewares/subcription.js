const { Composer, Markup } = require("telegraf");
const { ADMINS, chats: allChats } = require("../data/conf");

const composer = new Composer();
composer.use(async (ctx, next) => {
  const chats = await allChats();
  let result = true;
  const buttons = [];
  for (let e = 0; e < chats.length; e++) {
    const chatUsername = chats[e];
    try {
      // Get the chat ID of the group using its username
      const chat = await ctx.telegram.getChat(chatUsername);
      console.log("chat", chat);
      const chatId = chat.id;
      buttons.push([chat.invite_link]);
      // Get the chat members
      const member = await ctx.telegram.getChatMember(
        chatId,
        ctx.message.from.id
      );
      ctx.reply(`Working`);
      console.log("member", member);
      if (
        member.status === "member" ||
        member.status === "administrator" ||
        member.status === "creator"
      ) {
        result*=true;
        ctx.reply(`You are a member of the chat: ${chat.invite_link}`);
      } else {
        result*=false;
        ctx.reply(`You are not a member of the chat: ${chat.invite_link}`);
        break;
      }
    } catch (error) {
      console.error("Error getting chat data:", error);
      for (let i = 0; i < ADMINS.length; i++) {
        const admin = ADMINS[i];
        ctx.sendMessage(
          `Chat malumotlarini olishda muammo: chat=${chatUsername} error:${error}`,
          { chat_id: admin }
        );
      }
      // ctx.reply("Xatolik yuz berdi");
    }
  }
  next();
  //   const chatUsername = "@gdfnjduy";
});
module.exports = composer;
