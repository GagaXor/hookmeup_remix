import {} from "node-telegram-bot-api"
import type { ActionArgs } from "@remix-run/node";
import TelegramBot from "node-telegram-bot-api";

const url = process.env.URL;
export const action = async ({ request }: ActionArgs) => {
    const TOKEN = process.env.TOKEN || "6559561273:AAEcteo9Zcr989jr3m6YK_BKZMiQ5wBIJyA";
    const SERVER_URL = process.env.SERVER_URL
    const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
    const URI = `/webhook/${TOKEN}`
    const webhookURL = `${SERVER_URL}${URI}`


    const bot = new TelegramBot(TOKEN, { polling: true });
    
    bot.setWebHook(`${url}/bot${TOKEN}`)
    
    bot.openWebHook();

};
