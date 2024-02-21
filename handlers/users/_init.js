const { Composer } = require("telegraf");
const composer = new Composer();
composer.use(
  require("./admin"),
  require("./staff"),
  require("./start"),
  require("./fancy-text"),
  require("./names"),
  require("./help"),
  require("./echo"),
);

module.exports = composer;
