const { Composer } = require("telegraf");
const composer = new Composer();
composer.use(
  // require("./state"),
  require("./fancy-text"),
  require("./start"),
  require("./names"),
  require("./help"),
  require("./echo"),
  require("./form")
);

module.exports = composer;
