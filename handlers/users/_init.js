const { Composer } = require("telegraf");
const composer = new Composer();
composer.use(
  // require("./state"),
  require("./start"),
  require("./fancy-text"),
  require("./names"),
  require("./help"),
  require("./echo"),
  require("./form")
);

module.exports = composer;
