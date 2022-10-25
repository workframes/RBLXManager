const { EmbedBuilder } = require('discord.js');
const { userIdToName } = require('../../util/helper');
const { GAME } = require('../../config.json');

module.exports = {
    name: "unban",
    managerOnly: true,
    run: async ({ client, message, args, banData, messager }) => {
        try{
            BigInt(args[0])
        }
        catch{
            return await message.reply("Please specify a valid roblox user Id.")   
        }
        if (!args[0]) return await message.reply("Please specify a valid roblox user Id.")
        
        const userName = await userIdToName(args[0]);
        if(!userName) return await message.reply("Specified user doesn't exist.");

        const success = await banData.SetAsync(GAME.DATASTORE_NAME, args[0], { banned: false, dateUpdated: String(Math.floor(Date.now() / 1000)), updatedBy: message.author.tag })
        
        if (success) {
            const Embed = new EmbedBuilder()
                .setColor("#18A558")
                .setTitle(`Successfully unbanned, **${userName || args[0]}**!`)
                .setDescription('If this was a mistake and you would like to unabn them, please use `prefix@ban <userId>`')
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${args[0]}&width=420&height=420&format=png`)
                .setTimestamp()

            return await message.reply({ embeds: [Embed] });
        }
        else
            return await message.reply(`Failed to unban **${userName || args[0]}**`)

    }
}