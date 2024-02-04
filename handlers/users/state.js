const { Composer } = require("telegraf");
const composer = new Composer();
const unionFilters = require("../../utils/unionFilters");

const { formState } = require("../../states/form");

const stateFilter = require("../../filters/stateFilter");

const {
  commandFilter,
  hashtagFilter,
  textFilter,
} = require("../../filters/custom");

composer.on(unionFilters(textFilter((text) => text === "/form"), stateFilter("-")), (ctx) => {
  ctx.reply(`Ismingizni kiriting`);
  ctx.state.setState = formState;
});

composer.on(stateFilter(formState.name), (ctx) => {
  ctx.state.data.name = ctx.message.text;
  ctx.reply(`Familyangiz`);
  ctx.state.next();
});

composer.on(stateFilter(formState.fname), (ctx) => {
  ctx.state.data.fname = ctx.message.text;
  ctx.reply(`Yoshingiz`);
  ctx.state.next();
});

composer.on(stateFilter(formState.age), (ctx) => {
  ctx.state.data.age = ctx.message.text;
  console.log(ctx);
  const data = ctx.state.data;
  ctx.reply(
    `ism: ${data.name}\nfamilya: ${data.fname} \nyosh: ${data.age}`
  );
});


composer.on([textFilter((text) => text === "/hi1")], (ctx) => {
  ctx.state.setData = "Nomozov";
  ctx.reply(`state 2`);
});

module.exports = composer;
