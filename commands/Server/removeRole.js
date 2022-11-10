const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { rolesSlashCommand } = require('../../util/Helper');
const DotJson = require('dot-json');

module.exports = class RemoveRole extends BaseSlashCommand{
    constructor(){
        super('removerole', true)
    }

    async run(client, interaction){
        const role = interaction.options.getString('role');
        const managers = new DotJson('managers.json');
        let currentManagers = managers.get('ROLES');

        if(!currentManagers.includes(role)) 
            return await interaction.reply(`Specified role does not exist in the manager database.`)

        currentManagers = currentManagers.filter(_role => _role !== role);

        managers.set('ROLES', currentManagers);
        managers.save();

        delete require.cache[require.resolve('../../managers.json')];
        return await interaction.reply(`Successfuly removed **${role}** from the manager database.`);
    }

    getRaw(){
        const currentRoles = rolesSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Removes a role from the manager database.')
            .addStringOption((option) =>
                option
                    .setName('role')
                    .setDescription('Role you would like to remove from manager database.')
                    .setRequired(true)
                    .addChoices(...currentRoles)
            )
        .toJSON();
    }
}