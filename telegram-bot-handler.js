const TelegramBot = require('node-telegram-bot-api');

// BotFather'dan aldığınız tokenı buraya yapıştırın
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Yeni bir TelegramBot örneği oluşturun
const bot = new TelegramBot(token, { polling: true });

// "/start" komutunu yanıtla
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Merhaba! Benimle konuşmak için komutları kullanın.");
});

// "/help" komutunu yanıtla
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Yardım için buradayım. Mevcut komutlar: /start, /help");
});

// Gelen metin mesajlarını dinle ve yanıtla
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Mesajın komut olup olmadığını kontrol edin
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, "Mesajınızı aldım: " + msg.text);
    }
});
