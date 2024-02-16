const { Markup } = require("telegraf");

exports.keyboard1 = Markup.inlineKeyboard([
  [
    Markup.button.callback("1️⃣", "beardMan"),
    Markup.button.callback("2️⃣", "threeDMuslim"),
    Markup.button.callback("3️⃣", "boyAvatar3D"),
  ],
  [
    Markup.button.callback("4️⃣", "coolGuy"),
    Markup.button.callback("5️⃣", "cuteGirl"),
    Markup.button.callback("6️⃣", "cuteHijabQueen3D"),
  ],
  [
    Markup.button.callback("7️⃣", "flowersAndGirl"),
    Markup.button.callback("8️⃣", "gangBoy"),
    Markup.button.callback("9️⃣", "girlWithFlower"),
  ],
  [Markup.button.callback("⏭", "names_2")],
  [Markup.button.callback("🏠 bosh sahifaga", "home")],
]);

exports.keyboard2 = Markup.inlineKeyboard([
  [
    Markup.button.callback("1️⃣", "girlWithFlowers"),
    Markup.button.callback("2️⃣", "glassedGuy"),
    Markup.button.callback("3️⃣", "hijabGirl3D"),
  ],
  [
    Markup.button.callback("4️⃣", "hijabGirl2"),
    Markup.button.callback("5️⃣", "hijabQueen"),
    Markup.button.callback("6️⃣", "animeMuslim"),
  ],
  [
    Markup.button.callback("7️⃣", "muslimGirl"),
    Markup.button.callback("8️⃣", "photographerGirl"),
    Markup.button.callback("9️⃣", "realMan"),
  ],
  [
    Markup.button.callback("⏮", "names_1"),
    Markup.button.callback("⏭", "names_3"),
  ],
  [Markup.button.callback("🏠 bosh sahifaga", "home")],
]);

exports.keyboard3 = Markup.inlineKeyboard([
  [
    Markup.button.callback("1️⃣", "shyGuy"),
    Markup.button.callback("2️⃣", "simpleGirl"),
  ],
  [
    Markup.button.callback("3️⃣", "stuardess"),
    Markup.button.callback("4️⃣", "studentGirl"),
    Markup.button.callback("5️⃣", "whiteheadBoy"),
  ],
  [Markup.button.callback("⏮", "names_2")],
  [Markup.button.callback("🏠 bosh sahifaga", "home")],
]);
