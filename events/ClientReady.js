const { Events } = require('discord.js');

const client = require('../main');

client.on(Events.ClientReady, async () => {
    console.log(`Клиент ${client.user.tag} авторизировался в системе`);
});
