const { glob } = require("glob");
const { promisify } = require("util");
const { Client, Events } = require("discord.js");
const mongoose = require("mongoose");
const config = require('../configs/config.json');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */

module.exports = async (client) => {

    // Ивенты
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Команды
    const slashCommands = await globPromise(
        `${process.cwd()}/commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    client.on(Events.ClientReady, async () => {
        await client.application.commands.set(arrayOfSlashCommands);
    });

    // mongoose
    const { mongooseConnectionString } = require('../configs/config.json');
    if (!mongooseConnectionString) return;

    mongoose.connect(mongooseConnectionString).then(() => console.log('База данных загружена'));
};
