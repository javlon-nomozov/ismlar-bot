const { Telegraf } = require("telegraf");
const { BOT_TOKEN } = require("./data/conf");

// initialize environmental variables
const bot = new Telegraf(BOT_TOKEN);
module.exports = { bot };
