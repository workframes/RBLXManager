const DotJson = require('dot-json');
const { EmbedBuilder } = require('discord.js')
const { GUILD_ID } = require('../../config.json');

module.exports = {
    name: "managers",
    managerOnly: false,
    run: async ({ client, message, args, banData, messager }) => {
        let managers = new DotJson('managers.json');

        const ROLES = managers.get("ROLES");
        const USERS = managers.get("USERS")
        const GUILD = client.guilds.cache.find(_guild => _guild.id === GUILD_ID);

        let rolesStr = ""
        let usersStr = ""

        USERS.forEach((user) => {
            const member = client.users.cache.find(_user => _user.id === user)
            if(!member) return
            usersStr += `\`${member.tag}\` \n`
        })

        ROLES.forEach((role) => {
            const guildRole = GUILD.roles.cache.find(_role => _role.id === role)
            if(!guildRole) return
            rolesStr += `\`${guildRole.name}\` \n`
        })

        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Current List of Managers`)
            .setTimestamp()
            .addFields(
                { name: "Users", value: usersStr, inline: true },
                { name: "Roles", value: rolesStr, inline: true }
            )
        
        return await message.reply({ embeds: [ Embed ] });
    }
}