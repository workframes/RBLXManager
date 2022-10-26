const { EmbedBuilder } = require('discord.js');
const { userIdToName, shallowClone } = require('../../util/helper');
const { GAME } = require('../../config.json');

module.exports = {
    name: "kick",
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

        let reason;

        if(args.length > 1){
            reason = "";
            shallowClone(args).slice(1).forEach((word) => {
                reason += `${word} `
            });
        }

        console.log((reason || GAME.BAN_MESSAGE))

        const messageSuccess = await messager.PostTopic("RBLXManager", JSON.stringify({ user: args[0], reason: GAME.KICK_MESSAGE || reason }))

        if (messageSuccess) {
            const Embed = new EmbedBuilder()
                .setColor("#18A558")
                .setTitle(`Successfully kicked, **${userName || args[0]}**!`)
                .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${args[0]}&width=420&height=420&format=png`)
                .setTimestamp()

            return await message.reply({ embeds: [Embed] });
        }
        else
            return await message.reply(`Failed to kick **${userName || args[0]} or failed to notify server!**`)

    }
}