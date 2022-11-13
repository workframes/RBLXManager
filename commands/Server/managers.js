const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const DotJson = require('dot-json');
const BaseSlashCommand = require('../../util/BaseSlashCommand');

module.exports = class Managers extends BaseSlashCommand{
    constructor(){
        super('managers', true)
    }

    async run(client, interaction){
        let managers = new DotJson('managers.json');

        const ROLES = managers.get("ROLES");
        const USERS = managers.get("USERS");
        const GUILD = interaction.guild;

        let rolesStr;
        let usersStr;

        if(USERS.length > 0){
            usersStr = "";
            await USERS.forEach(async (user) => {
                const member = await client.users.fetch(user);
                if(!member) return
                usersStr += `\`${member.tag}\` \n`
            })
        }

        if(ROLES.length > 0){
            rolesStr = "";
            await ROLES.forEach(async (role) => {
                const guildRole = await GUILD.roles.fetch(role);
                if(!guildRole) return
                rolesStr += `\`${guildRole.name}\` \n`
            })
        }

        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Current List of Managers`)
            .setTimestamp()
            .addFields(
                { name: "Users", value: usersStr || "`None`", inline: true },
                { name: "Roles", value: rolesStr || "`None`", inline: true }
            )
        console.lo
        return await interaction.reply({ embeds: [ Embed ] });
    }

    getRaw(){
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Returns all the current managers.')
            .toJSON();
    }
}