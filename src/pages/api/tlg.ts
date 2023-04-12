import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { QuizInstance } from "~/models";
import { getBaseUrl } from "~/utils/api";

// const token = process.env.NEXT_TELEGRAM_TOKEN as string;
const token = "5638005581:AAFfqLFFPbmQiHvGtEZ-yr67bFNkdDU1lrQ";
const url = getBaseUrl();

const bot = new Telegraf(token);
bot.start(async (ctx) => {
  console.log(ctx);

  ctx.reply("Welcome");
  let questions: QuizInstance[] = [];
  try {
    const resp = await fetch(`${url}/api/trpc/quiz.getAll`);
    const quiz: { result: { data: { json: QuizInstance[] } } } =
      await resp.json();
    console.log("🚀 ~ file: tlg.ts:28 ~ bot.on ~ quiz:", quiz);
    questions = quiz.result.data.json;
    ctx.reply("Вопросы получены");
    ctx.reply(JSON.stringify(questions));
  } catch (error) {
    ctx.reply("Что-то пошло не так");
    ctx.reply(JSON.stringify(error));
  }
  ctx.reply("Вопросы");
  ctx.reply(JSON.stringify(questions));
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
