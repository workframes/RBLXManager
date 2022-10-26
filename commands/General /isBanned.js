const { EmbedBuilder } = require('discord.js');
const { userIdToName } = require('../../util/helper');
const { GAME } = require('../../config.json');

module.exports = {
    name: "isBanned",
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

        const data = await banData.GetAsync(GAME.DATASTORE_NAME, args[0])
        if(!data) return await message.reply("Unabale to find a data entry for specified user or is not banned.")

        const Embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(`Status of, **${userName || args[0]}**!`)
                .setDescription(`**Banned:** \`${data.banned}\` \n **Reason:** \`${data.reason}\` \n **Status Updated On:** \`${new Date((data.dateUpdated) * 1000)}\` \n **Status Updated By:** \`${data.updatedBy}\``)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${args[0]}&width=420&height=420&format=png`)
                .setTimestamp()

        return await message.reply({ embeds: [Embed] });

    }
}