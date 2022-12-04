const { roleCheck } = require('../util/Helper');

module.exports = {
    name: 'interactionCreate',
    run: async (_CLIENT, interaction) => {
        const { client } = _CLIENT;
        const { commandName } = interaction;
        const command = client.slashCommands.get(commandName);
        if(!command) return;

        const member = interaction.member;

        if(command._restricted && member.id !== interaction.guild.ownerId){
            const { USERS } = require('../managers.json');
            const isInUsers = USERS.includes(String(member.user.id)) 
            const hasRole = await roleCheck(member.roles.cache)
            const canRun = (isInUsers || hasRole)

            if(!canRun) return;
        }

        try{
            await command.run(client, interaction);
        }catch(err){
            console.error(err)
            return await interaction.reply("Failed to run command, please try again later.")
        }
    }
}