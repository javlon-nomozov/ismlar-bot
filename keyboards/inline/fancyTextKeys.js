const { Markup } = require("telegraf");

exports.keyboard1 = Markup.inlineKeyboard([
  [
    Markup.button.callback("ℕ𝕒𝕞𝕦𝕟𝕒 𝕞𝕒𝕥𝕟", "type1"),
    Markup.button.callback("🅝🅐🅜🅤🅝🅐 🅜🅐🅣🅝", "type2"),
  ],
  [
    Markup.button.callback("Ⓝⓐⓜⓤⓝⓐ ⓜⓐⓣⓝ", "type3"),
    Markup.button.callback("𝔑𝔞𝔪𝔲𝔫𝔞 𝔪𝔞𝔱𝔫", "type4"),
  ],
  [
    Markup.button.callback("𝕹𝖆𝖒𝖚𝖓𝖆 𝖒𝖆𝖙𝖓", "type5"),
    Markup.button.callback("Naͣmͫuͧnaͣ mͫaͣᴛⷮn", "type6"),
  ],
  [
    Markup.button.callback("N̸̽a̴͋m̸̒u̴̓ǹ̸a̴͋ m̸̒a̴͋t̵͝ǹ̸", "type7"),
    Markup.button.callback("Naͣmͫuͧnaͣ mͫaͣᴛⷮn", "type8"),
  ],
  [Markup.button.callback("𝕹𝖆𝖒𝖚𝖓𝖆 𝖒𝖆𝖙𝖓", "type9")],
  [Markup.button.callback("🏠 bosh sahifaga", "home")],
]);
