const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { GAME } = require('../../config.json');
const { universeSlashCommand, userIdToName, userNameToID, isNum } = require('../../util/Helper');

module.exports = class Unban extends BaseSlashCommand{
    constructor(){
        super('unban', true);
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const datastore = universe.datastore;

        let userId = interaction.options.getString('user');
        let userName;

        if(isNum(userId)){
            const data = await userNameToID(userId);

            userId = data.id;
            userName = data.name;
        }
        else{
            userName = await userIdToName(userId);
        }

        if(!userName) return await interaction.reply("Specified user doesn't exist.");
        const reason = interaction.options.getString('reason') ?? GAME.UNBAN_REASON;

        const banData = {
            banned: false, 
            dateUpdated: String(Math.floor(Date.now() / 1000)), 
            updatedBy: interaction.member.user.tag, 
            reason: reason
        }

        const success = await datastore.SetAsync(userId, banData);

        if(success){
            const Embed = new EmbedBuilder()
                .setColor("#18A558")
                .setTitle(`Successfully unbanned, **${userName}**!`)
                .setDescription(`**Universe:** \`${universe.name}\` \n If this was a mistake and you would like to unabn them, please use \`prefix@ban <userId> <reason>\``)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
                .setTimestamp();

            return await interaction.reply({ embeds: [Embed] });
        }
        else
            return await interaction.reply(`Failed to unban **${userName}**`)
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Unbans the given user from the specifed universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to unban the user from.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addStringOption((option) => 
                option
                    .setName('user')
                    .setDescription('User you would like to unban')
                    .setRequired(true)
            )
            .addStringOption((option) => 
                option
                    .setName('reason')
                    .setDescription('Reason you want to unban the user for.')
            )
            .toJSON();
    }
}