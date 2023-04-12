import TelegramBot from "node-telegram-bot-api";
import { QuizInstance } from "~/models";
import { AppRouter, appRouter } from "~/server/api/root";
import { getBaseUrl } from "~/utils/api";
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.NEXT_TELEGRAM_TOKEN as string;
const url = getBaseUrl();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

const questions = [];

bot.onText(/\/start/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const resp = await fetch(`${url}/api/trpc/quiz.getAll`);
  const quiz: { result: { data: { json: QuizInstance[] } } } =
    await resp.json();

  const questions = quiz.result.data.json;
  const chatId = msg.chat.id;
  // const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, JSON.stringify(questions)).then((addApiId) => {
    bot.onReplyToMessage(addApiId.chat.id, addApiId.message_id, (msg) => {
      settings.api_id = msg.text;
      bot.sendMessage(addApiId.chat.id, "Выберете шаблон", {
        reply_markup: {
          inline_keyboard,
        },
      });
    });
  });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // const quiz = appRouter.quiz.getAll();
  const resp = await fetch(`${url}/api/trpc/quiz.getAll`);
  const quiz: { result: { data: { json: QuizInstance[] } } } =
    await resp.json();
  console.log("🚀 ~ file: tlg.ts:28 ~ bot.on ~ quiz:", quiz);
  // console.log("msg", msg);
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
  // bot.sendMessage(chatId, "Received your message" + ": " + msg);
  bot.sendMessage(chatId, JSON.stringify(quiz.result.data.json));
  questions.push(...quiz.result.data.json);
  console.log("qustions");
});

export default bot;
