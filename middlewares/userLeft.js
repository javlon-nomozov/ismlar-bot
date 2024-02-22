const { Composer } = require("telegraf");
const { userLeft, createUser, userRestart } = require("../utils/db/database");

const composer = new Composer();

composer.use(async (ctx, next) => {
  if (ctx.update.my_chat_member) {
    const user = ctx.update.my_chat_member.from;
    if (
      ctx.update.my_chat_member.new_chat_member
        .status === "kicked"
    ) {
      try {
        await userLeft(ctx.update.my_chat_member.from.id);
      } catch (error) {}
    } else if (
      ctx.update.my_chat_member.new_chat_member
        .status === "member"
    ) {
      try {
        await createUser({ id: user.id, role: "member", coin: "300" });
      } catch (error) {
        try {
          await userRestart(user.id);
        } catch (error) {}
      }
    }
  }
  return next();
});

module.exports = composer;
