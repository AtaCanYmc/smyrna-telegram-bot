const TelegramBot = require('node-telegram-bot-api');
const {getApiList, izbbUrlList, getNearestLocations} = require("./smyrna-api-handler");
const token = '[TOKEN]';
const bot = new TelegramBot(token, { polling: true });

const startTelegramBot = () => {
    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Merhaba! En yakın nöbetci eczanaler için konum gönderin :)");
    });
    bot.on('location', async (msg) => {
        const chatId = msg.chat.id;
        const latitude = msg.location.latitude;
        const longitude = msg.location.longitude;
        const nobetciEczaneler = await getApiList(izbbUrlList.nobetciEczane);

        if (nobetciEczaneler) {
            const yakinList = getNearestLocations(
                latitude,
                longitude,
                3,
                nobetciEczaneler,
                'LokasyonX',
                'LokasyonY'
            );

            yakinList.forEach((eczane) => {
                bot.sendVenue(
                    chatId,
                    eczane['LokasyonX'],
                    eczane['LokasyonY'],
                    `${eczane['Adi']}`,
                    `(${(eczane['UzaklikMetre']/1000).toFixed(2)} km)\n`
                    + `${eczane['Telefon']}`
                );
            });
        } else {
            bot.sendMessage(chatId, 'API problemi yaşanmakta!');
        }
    });
    bot.on("polling_error", console.log);
};


module.exports = {
    startTelegramBot
};



