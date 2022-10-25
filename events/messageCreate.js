const Discord = require('discord.js');
const { roleCheck } = require('../util/helper');


module.exports = {
    name: 'messageCreate',
    run: async (_CLIENT, message) => {
        const { client, prefix, banData, messager } = _CLIENT;

        if(!message.guild) return;
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdstr = args.shift().toLowerCase();

        let command = client.commands.get(cmdstr);
        if(!command) return;

        let member = message.member;

        if(command.managerOnly && member.id !== message.guild.ownerId){
            const { USERS } = require('../managers.json');
            const isInUsers = USERS.includes(String(member.id)) 
            const hasRole = await roleCheck(member.roles.cache)
            const canRun = (isInUsers || hasRole)

            if(!canRun) return
        }
        
        try{
            await command.run({ ..._CLIENT, message, args, banData, messager });
        } 
        catch(err){
            let errMsg = err.toString()

            if(errMsg.startsWith('?')) {
                errMsg = errMsg.slice(1)
                await message.reply(errMsg)
            }
            else 
                return await message.reply("Failed to run command, please try again later.")
        };
    }
}