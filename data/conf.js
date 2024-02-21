const {
  getAllChannel,
  getAllUser,
  getAllStaff,
} = require("../utils/db/database");

// initialize environmental variables
require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMINS = process.env.ADMINS.split(",");
const CHATS = process.env.CHATS.split(",");

// const allChats = () =>
//   new Promise((res) => {
//     setTimeout(() => res(CHATS), 200);
//   });

const allChats = getAllChannel;
const allUsers = getAllUser;

const allAdmins = () =>
  new Promise((res) => {
    setTimeout(() => res(ADMINS), 0);
  });
const allStaff = getAllStaff;

module.exports = { BOT_TOKEN, allAdmins, allStaff, allChats, allUsers };
