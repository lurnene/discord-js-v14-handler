const { Client, CommandInteraction } = require('discord.js');

const config = require('../../configs/config.json');

module.exports = {
    name: `test`,
    description: 'test',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        await interaction.followUp({content: `test`});

    }, 
};