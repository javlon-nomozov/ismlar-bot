module.exports = (ctx, next) => {
  console.log(ctx);
  // console.log(`${/*ctx.message*/ 1}-${ctx.update}`);
  // console.log(
  //   "chat:",
  //   (ctx.update.message ? ctx.update.message : ctx.update.callback_query).chat
  // );

  // const data1 = ctx.update.message
  //   ? ctx.update.message
  //   : ctx.update.callback_query;
  // console.log(data1);
  // const data2 = data1.text ? data1.text : data1.data;
  // console.log(data2);
  next();
};
