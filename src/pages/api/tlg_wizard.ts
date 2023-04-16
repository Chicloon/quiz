import { InlineKeyboardMarkup } from "node-telegram-bot-api";
import { Scenes, Markup, Telegraf, Composer, session } from "telegraf";
// import { message } from "telegraf/filters";
import { WizardScene, Stage } from "telegraf/src/scenes";
import { QuestionInstance, QuizInstance } from "~/models";
import { getBaseUrl } from "~/utils/api";

// const WizardScene = Scenes.WizardScene;
// const Stage = Scenes.Stage

// const token = process.env.NEXT_TELEGRAM_TOKEN as string;
const token = "5638005581:AAFfqLFFPbmQiHvGtEZ-yr67bFNkdDU1lrQ";
const url = getBaseUrl();

const stepHandler = new Composer();
stepHandler.action("next", (ctx) => {
  ctx.reply("Step 2. Via inline button");
  return ctx.wizard.next();
});
stepHandler.command("next", (ctx) => {
  ctx.reply("Step 2. Via command");
  return ctx.wizard.next();
});
stepHandler.use((ctx) =>
  ctx.replyWithMarkdown("Press `Next` button or type /next")
);

const superWizard = new WizardScene(
  "super-wizard",
  (ctx) => {
    ctx.reply(
      "Step 1",
      Markup.inlineKeyboard([
        Markup.urlButton("❤️", "http://telegraf.js.org"),
        Markup.callbackButton("➡️ Next", "next"),
      ]).extra()
    );
    return ctx.wizard.next();
  },
  stepHandler,
  (ctx) => {
    ctx.reply("Step 3");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply("Step 4");
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply("Done");
    return ctx.scene.leave();
  }
);

const bot = new Telegraf(token);
const stage = new Stage([superWizard], { default: "super-wizard" });
bot.use(session());
bot.use(stage.middleware());
bot.launch();
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
