require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');
const { decode } = require('html-entities');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// openai.api_key = process.env.OPENAI_API_KEY;
// const bot = new TelegramBot(process.env.TG_API_KEY, { polling: true });

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     if (msg.text) {
//         const response = await openai.completions.create({
//             engine: 'davinci',
//             prompt: msg.text,
//             maxTokens: 60,
//             n: 1,
//             temperature: 0.5
//         });
//         const message = decode(response.data.choices[0].text);
//         bot.sendMessage(chatId, message);
//     }
// });

async function sendRequest(msg) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg,
        temperature: 0.6,
        max_tokens: 200
    });
    console.log("Request done");
    console.log(decode(response.data.choices[0].text));
    // await openai.completions.create({
    //     engine: 'davinci',
    //     prompt: msg,
    //     maxTokens: 60,
    //     n: 1,
    //     temperature: 0.5
    // });
    // const message = decode(response.data.choices[0].text);
    const message = response;
    return message;
}

sendRequest("How to cook sushi?");