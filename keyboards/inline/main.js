const { button, inlineKeyboard } = require("telegraf").Markup;
const keyboard = inlineKeyboard([
  // [button.callback('Ismlarga rasimlar','imgNames')],
  [button.url('Ismlarga rasimlar','https://t.me/+qxUhOLCHSOZjYjFi')],
  // [button.callback('Chiroyli shriftlar','fancyTexts')],
  [button.url('Chiroyli shriftlar','https://t.me/+LlD5sLW22q84MzAy')],
  [button.url("Boshqa foydali botlar", "https://t.me/+Oiyyu62odUxkN2Ji")],
]);

// Send a message with the inline keyboard
exports.mainInlineKey = keyboard;
