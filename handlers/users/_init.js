const { Composer } = require("telegraf");
const composer = new Composer();
composer.use(
  require("./state"),
  require("./examples"),
  require("./form"),
  require("./start"),
  require("./help")
);

module.exports = composer;
