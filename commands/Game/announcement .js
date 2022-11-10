const { SlashCommandBuilder, EmbedBuilder, Base } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { universeSlashCommand } = require('../../util/Helper');

module.exports = class Annoucement extends BaseSlashCommand{
    constructor(){
        super("annoucement", true)
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const messager = universe.messager;

        const message = interaction.options.getString('message');
        const duration = interaction.options.getInteger('duration') ?? 5;

        const messageData = {
            func: "ANNOUNCE",
            data: {
                message: message,
                duration: duration
            }
        }
        const messageSuccess = await messager.PostTopic("RBLXManager", JSON.stringify(messageData));

        if(messageSuccess)
            return await interaction.reply(`Succesfully announced message on all servers of \`${universe.name}\`.`)
        else
            return await interaction.reply('Failed to announce message.')
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Anounce a message globally.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to ban the user from.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addStringOption((option) => 
                option
                    .setName('message')
                    .setDescription('The message you want to announce.')
                    .setRequired(true)
            )
            .addIntegerOption((option) => 
                option
                    .setName('duration')
                    .setDescription('The amount of seconds you want the message to show, defaults to 5 seconds.')
                    .setRequired(false)
            )
            .toJSON();
    }
}