const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { GAME } = require('../../config.json');
const { universeSlashCommand, userIdToName } = require('../../util/Helper');


module.exports = class IsBanned extends BaseSlashCommand{
    constructor(){
        super('isbanned', true);
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const datastore = universe.datastore;

        const userId = interaction.options.getInteger('userid');
        const userName = await userIdToName(userId);
        if(!userName) return await interaction.reply("Specified user doesn't exist.");

        const banData = await datastore.GetAsync(GAME.DATASTORE_NAME, userId);
        if(!banData) return await interaction.reply("Unabale to find a data entry for specified user or is not banned.");
        
        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Status of, **${userName}**!`)
            .addFields(
                { name: '**Universe**', value: universe.name },
                { name: '**Banned**', value: String(banData.banned) },
                { name: '**Reason**', value: banData.reason },
                { name: '**Status Updated On**', value: String(new Date((banData.dateUpdated ?? undefined) * 1000)) },
                { name: '**Status Updated By**', value: banData.updatedBy },
                { name: '**Unban Time**', value: String(new Date((banData.unBanTime) * 1000)) }
            )
            .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
            .setTimestamp();

        return await interaction.reply({ embeds: [Embed] });
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Checks the ban status of the giver user.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to check the user\' status.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addIntegerOption((option) => 
                option
                    .setName('userid')
                    .setDescription('User you would like to check there status.')
                    .setRequired(true)
            )
            .toJSON();
    }
}