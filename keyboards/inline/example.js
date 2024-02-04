const { button, inlineKeyboard } = require("telegraf").Markup;
const keyboard = inlineKeyboard(
  [[
    // link button
    button.url("Admin", "https://t.me/great_lvl"),
    // callback button
    button.callback("Click me", "button_clicked"),],
    [button.callback("Click me", "button_clickedd")]
  ]
);

// Send a message with the inline keyboard
module.exports = { inlineKeyboard: keyboard };
