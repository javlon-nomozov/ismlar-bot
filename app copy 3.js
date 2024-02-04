// const { Telegraf, session } = require("telegraf");

// require("dotenv").config();

// const { formState } = require("./states/form");

// const bot = new Telegraf(process.env.BOT_TOKEN);


// // Use the session middleware
// bot.use(session());

// // Start command
// bot.start((ctx,next) => {
//   // Initialize user state if it doesn't exist
//   const state = formState;
//   // ctx.session = ctx.session || state;
//   console.log(ctx.session);
//   ctx.session = {};
//   ctx.session.state = ctx.session.state || state
//   // ctx.state = ctx.state || { condition: 'hi' };
//   // ctx.session.state = ctx.session.state || {};
//   ctx.reply("Welcome! Type /step1 to start.");
//   next()
// });
// // Start command
// bot.start((ctx) => {
//   // Initialize user state if it doesn't exist
//   const state = formState;
//   // ctx.session = ctx.session || state;
//   console.log(ctx.session);
//   ctx.session = {};
//   ctx.session.state = ctx.session.state || state
//   // ctx.state = ctx.state || { condition: 'hi' };
//   // ctx.session.state = ctx.session.state || {};
//   ctx.reply("Welcome! Type /step1 to start.");
//   // next()
// });

// // Step 1 command
// bot.command("step1", (ctx) => {
//   // Update user state
//   console.log(ctx);
//   console.log(ctx.session);
//   ctx.session.state.setData = 'hello'
//   ctx.session.state.next()
//   console.log(ctx.session);
//   ctx.session.state.step = 1;
//   ctx.reply("You are now in step 1. Type /step2 to proceed.");
// });

// // Step 2 command
// bot.command("step2", (ctx) => {
//   // Check if the user completed step 1
//   if (ctx.session.state.step === 1) {
//     // Update user state
//     ctx.session.state.step = 2;
//     ctx.reply("You have completed step 2. Conversation ended.");
//   } else {
//     ctx.reply("You need to complete step 1 first. Type /step1 to start.");
//   }
// });

// // Launch the bot
// bot.launch();
