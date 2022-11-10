const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { GAME } = require('../../config.json');
const { universeSlashCommand, userIdToName } = require('../../util/Helper');

module.exports = class Ban extends BaseSlashCommand{
    constructor(){
        super('ban', true);
    }
    
    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const datastore = universe.datastore;
        const messager = universe.messager;

        const userId = interaction.options.getInteger('userid');
        const userName = await userIdToName(userId);

        if(!userName) return await interaction.reply("Specified user doesn't exist.");

        const reason = interaction.options.getString('reason') ?? GAME.BAN_REASON;
        const time = interaction.options.getInteger('time')

        let unBanTime;

        if(time){
            unBanTime = Math.floor(Date.now() / 1000) + (time * 3600);
        }

        const banData = {
            banned: true, 
            dateUpdated: Math.floor(Date.now() / 1000), 
            updatedBy: interaction.member.user.tag, 
            reason: reason,
            unBanTime: unBanTime
        }
        const messageData = {
            func: "KICK",
            data: {
                user: userId,
                reason: reason
            }
        }

        const success = await datastore.SetAsync(GAME.DATASTORE_NAME, userId, banData);
        const messageSuccess = await messager.PostTopic("RBLXManager", JSON.stringify(messageData));

        if(success && messageSuccess){
            const Embed = new EmbedBuilder()
                .setColor("#EE4B2B")
                .setTitle(`Successfully banned, **${userName}**!`)
                .setDescription(`**Universe:** \`${universe.name}\` \n If this was a mistake and you would like to unabn them, please use \`prefix@unban <userId>\``)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`)
                .setTimestamp();

            return await interaction.reply({ embeds: [Embed] });
        }
        else
            return await message.reply(`Failed to ban **${userName} or failed to notify server!**`);  
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Bans the given user from the specifed universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to ban the user from.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addIntegerOption((option) => 
                option
                    .setName('userid')
                    .setDescription('User you would like to ban')
                    .setRequired(true)
            )
            .addStringOption((option) => 
                option
                    .setName('reason')
                    .setDescription('Reason you want to ban the user for.')
            )
            .addIntegerOption((option) => 
                option
                    .setName('time')
                    .setDescription('How long you want to ban the user in hours.')
            )
            .toJSON();
    }
}