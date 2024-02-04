const { keyboard } = require("telegraf").Markup;

const defaultKeyboard = keyboard([["bir", "ikki"], ["ikkinchi qator"]]).oneTime().resize().placeholder('select what u want');

module.exports = { defaultKeyboard };
