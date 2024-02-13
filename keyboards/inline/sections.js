const fancyTextGen = require('../../utils/app/fancy-text-gen')
const imgNames = require('../../utils/app/names')
const { button, inlineKeyboard } = require("telegraf").Markup;

const keyboard = inlineKeyboard([
  [button.callback('Ismlarga rasimlar','imgNames')],
  [button.callback('Chiroyli shriftlar','fancyTexts')],
  [button.url("Boshqa foydali botlar", "https://t.me/+Oiyyu62odUxkN2Ji")],
]);

// Send a message with the inline keyboard
exports.mainInlineKey = keyboard;
