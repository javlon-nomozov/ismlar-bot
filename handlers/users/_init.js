const { Composer } = require("telegraf");
const composer = new Composer();
composer.use(
  require("./start"),
  require("./fancy-text"),
  require("./names"),
  require("./help"),
  require("./echo"),
);

module.exports = composer;
