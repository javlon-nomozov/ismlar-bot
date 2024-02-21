const { Composer } = require("telegraf");
const { userLeft, createUser, userRestart } = require("../utils/db/database");
const { logReturn } = require("../tools/functions");

const composer = new Composer();

composer.use(async (ctx, next) => {
  if (ctx.update.my_chat_member) {
    const user = ctx.update.my_chat_member.from;
    if (
      logReturn(ctx.update.my_chat_member.new_chat_member, "newCHatMemeber")
        .status === "kicked"
    ) {
      try {
        await userLeft(ctx.update.my_chat_member.from.id);
      } catch (error) {}
    } else if (
      logReturn(ctx.update.my_chat_member.new_chat_member, "newCHatMemeber")
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
