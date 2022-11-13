const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { GAME } = require('../../config.json');
const { universeSlashCommand, userIdToName, userNameToID, isNum } = require('../../util/Helper');


module.exports = class Kick extends BaseSlashCommand{
    constructor(){
        super('kick', true)
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const messager = universe.messager;

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

        const reason = interaction.options.getString('reason') ?? GAME.KICK_REASON;

        const messageData = {
            func: "KICK",
            data: {
                user: userId,
                reason: reason
            }
        }

        const messageSuccess = await messager.PostTopic("RBLXManager", JSON.stringify(messageData));

        if(messageSuccess){
            const Embed = new EmbedBuilder()
                .setColor("#18A558")
                .setTitle(`Successfully kicked, **${userName}**!`)
                .setDescription(`**Universe:** \`${universe.name}\` \n `)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
                .setTimestamp();

            return await interaction.reply({ embeds: [Embed] });
        }
        else
            return await interaction.reply(`Failed to kick **${userName}** or failed to notify server!`);
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Kicks the given user from the universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to kick the user from.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addStringOption((option) => 
                option
                    .setName('user')
                    .setDescription('User you would like to kick.')
                    .setRequired(true)
            )
            .addStringOption((option) => 
                option
                    .setName('reason')
                    .setDescription('Reason you want to ban the user for.')
            )
            .toJSON();
    }
}
