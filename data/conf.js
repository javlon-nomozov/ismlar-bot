// initialize environmental variables
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMINS = process.env.ADMINS.split(",");

module.exports = { BOT_TOKEN, ADMINS };
