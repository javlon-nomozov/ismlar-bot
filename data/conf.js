// initialize environmental variables
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMINS = process.env.ADMINS.split(",");
const CHATS = process.env.CHATS.split(",");

const chats = new Promise((res) => {
  setTimeout(() => res(CHATS), 200);
});

module.exports = { BOT_TOKEN, ADMINS, chats };
