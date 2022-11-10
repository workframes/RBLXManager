const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const DotJson = require('dot-json');

module.exports = class AddRole extends BaseSlashCommand{
    constructor(){
        super('addrole', true);
    }

    async run(client, interaction){
        const role = interaction.options.getRole('role')
        const managers = new DotJson('managers.json');
        const currentManagers = managers.get('ROLES');

        if(!currentManagers.includes(String(role.id))){
            currentManagers.push(String(role.id))
            managers.set('ROLES', currentManagers);
            managers.save();
            delete require.cache[require.resolve('../../managers.json')];
            return await interaction.reply(`Successfuly added a new role to manager data! **${role.name}**`);
        }
        else
            return await interaction.reply(`**${role.name}** already exists in the manager database.`);
    }

    getRaw(){
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Adds a role who will be able to manage the client.')
            .addRoleOption((option) =>
                option
                    .setName('role')
                    .setDescription('Role you would like to add to manager database.')
                    .setRequired(true)
            )
            .toJSON();
    }
}

