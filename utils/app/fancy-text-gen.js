const textData = require("../../data/text-data");

function generator(text, type) {
  const font = textData.texts[type];
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const el = text[i];
    result += font[el] ? font[el] : el;
  }
  return result;
}

for (let i = 0; i < Object.keys(textData.texts).length; i++) {
  const el = Object.keys(textData.texts)[i];
  module.exports[el] = (text) => generator(text, el);
}
