require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');
const { decode } = require('html-entities');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bot = new TelegramBot(process.env.TG_API_KEY,
    {
        webHook: {
            port: 3000,
            host: "0.0.0.0"
        }
        // polling: true
    }
);
bot.setWebHook("https://kindwiseoak.cyclic.app/bot" + process.env.TG_API_KEY);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg.text,
            temperature: 0.6,
            max_tokens: 100
        });

        const message = decode(decode(response.data.choices[0].text));
        bot.sendMessage(chatId, message);


    }
});