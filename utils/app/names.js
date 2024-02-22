const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

const main = async (
  text,
  textSize = 50,
  withShadow = false,
  image,
  x = 10,
  y = 300
) => {
  try {
    //creating file path
    let imgRaw = `public/images/raw/${image}.png`; //a 500px x 500px background image
    let imgActive = `public/images/active/${image}.png`;
    let imgExported = `public/images/export/${uuid()}.png`;

    let textData = {
      text: `${text}`.toUpperCase(), //the text to be rendered on the image
      maxWidth: 620, //image width - 10px margin left - 10px margin right
      maxHeight: 90, //text height + margin
      placementX: x, // on the x-axis
      placementY: y, //bottom of the image
    };

    const clone = await Jimp.read(imgRaw);
    await clone.clone().write(imgActive);

    // Load the font
    // const textSize = 50
    const font = await Jimp.loadFont(
      `./public/fonts/text-${textSize}-black/font.fnt`
    );
    const font2 = await Jimp.loadFont(
      `./public/fonts/text-${textSize}-white/font.fnt`
    );
    // const font3 = await Jimp.loadFont(`./public/fonts/text-${textSize}-cyan/font.fnt`);
    // const fontKhalif = await Jimp.loadFont("./public/fonts/khalif36/khalif.fnt");

    // Read the cloned (active) image
    const active = await Jimp.read(imgActive);

    // Create a new image for the text shadow
    if (withShadow) {
      // shadow 1
      const textShadow1 = new Jimp(active.bitmap.width, active.bitmap.height);

      // Print the text on the text shadow image
      textShadow1.print(
        font,
        textData.placementX,
        textData.placementY,
        {
          text: textData.text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        textData.maxWidth
      );

      // Apply the Gaussian blur to create the neon-like glow effect
      textShadow1.blur(15);
      // shadow 1
      const textShadow2 = new Jimp(active.bitmap.width, active.bitmap.height);

      // Print the text on the text shadow image
      textShadow2.print(
        font,
        textData.placementX,
        textData.placementY,
        {
          text: textData.text,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        textData.maxWidth
      );

      // Apply the Gaussian blur to create the neon-like glow effect
      textShadow2.blur(20);

      // Composite the text shadow onto the original image
      active.composite(textShadow1, 0, 0, { mode: Jimp.BLEND_DARKEN });
      active.composite(textShadow2, 0, 0, { mode: Jimp.BLEND_DARKEN });
    }

    // Print the original text on the original image
    active.print(
      font2,
      textData.placementX,
      textData.placementY,
      {
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      },
      textData.maxWidth
    );

    // Save the final image
    await active.quality(100).write(imgExported);

    setTimeout(() => {
      fs.unlink(imgExported, (err) => {
        if (err) console.log(err);
        else {
          // console.log(`\nDeleted file: ${imgExported}`);
        }
      });
    }, 20000);
    return imgExported;
  } catch (err) {
    console.log({ err });
  }
};

exports.beardMan = async (text) =>
  main(text, 50, true, "round-pics/beard-man", 10, 570);
exports.threeDMuslim = async (text) =>
  main(text, 50, true, "round-pics/3d-muslim", 10, 570);
exports.boyAvatar3D = async (text) =>
  main(text, 50, true, "round-pics/boy-avatar-3d", 10, 570);
exports.coolGuy = async (text) =>
  main(text, 50, true, "round-pics/cool-guy", 10, 570);
exports.cuteGirl = async (text) =>
  main(text, 50, true, "round-pics/cute-girl", 10, 570);
exports.cuteHijabQueen3D = async (text) =>
  main(text, 50, true, "round-pics/cute-hijab-queen-3d", 10, 570);
exports.flowersAndGirl = async (text) =>
  main(text, 50, true, "round-pics/flowers&girl", 10, 570);
exports.gangBoy = async (text) =>
  main(text, 50, true, "round-pics/gang-boy", 10, 570);
exports.girlWithFlower = async (text) =>
  main(text, 50, true, "round-pics/girl-with-flower", 10, 570);
exports.girlWithFlowers = async (text) =>
  main(text, 50, true, "round-pics/girl-with-flowers", 10, 570);
exports.glassedGuy = async (text) =>
  main(text, 50, true, "round-pics/glassed-guy", 10, 570);
exports.hijabGirl3D = async (text) =>
  main(text, 50, true, "round-pics/hijab-girl-3d", 10, 570);
exports.hijabGirl2 = async (text) =>
  main(text, 50, true, "round-pics/hijab-girl2", 10, 570);
exports.hijabQueen3D = async (text) =>
  main(text, 50, true, "round-pics/hijab-queen-3d", 10, 570);
exports.hijabQueen = async (text) =>
  main(text, 50, true, "round-pics/hijab-queen", 10, 570);
exports.animeMuslim = async (text) =>
  main(text, 50, true, "round-pics/anime-muslim", 10, 570);
exports.muslimGirl = async (text) =>
  main(text, 50, true, "round-pics/muslim-girl", 10, 570);
exports.photographerGirl = async (text) =>
  main(text, 50, true, "round-pics/photographer-girl", 10, 570);
exports.realMan = async (text) =>
  main(text, 50, true, "round-pics/real-man", 10, 570);
exports.shyGuy = async (text) =>
  main(text, 50, true, "round-pics/shy-guy", 10, 570);
exports.simpleGirl = async (text) =>
  main(text, 50, true, "round-pics/simple-girl", 10, 570);
exports.stuardess = async (text) =>
  main(text, 50, true, "round-pics/stuardess", 10, 570);
exports.studentGirl = async (text) =>
  main(text, 50, true, "round-pics/student-girl", 10, 570);
exports.whiteheadBoy = async (text) =>
  main(text, 50, true, "round-pics/whitehead-boy", 10, 570);
