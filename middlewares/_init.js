const { Composer } = require("telegraf");

const { session } = require("telegraf");

const composer = new Composer();

composer.use(session());
// local middlewares
// composer.use(require("./logger"));
composer.use(require("./userLeft"));
composer.use(require("./private"));
composer.use(require("./stateInitializer"));
composer.use(require("./subcription"));

module.exports = composer;
