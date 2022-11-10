const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const DotJson = require('dot-json');

module.exports = class AddManager extends BaseSlashCommand{
    constructor(){
        super('addmanager', true);
    }

    async run(client, interaction){
        const user = interaction.options.getUser('user');
        const managers = new DotJson('managers.json');
        const currentManagers = managers.get('USERS');

        if(!currentManagers.includes(String(user.id))){
            currentManagers.push(String(user.id))
            managers.set('USERS', currentManagers);
            managers.save();
            delete require.cache[require.resolve('../../managers.json')];
            return await interaction.reply(`Successfuly added a new manager! **${user.tag}**`);
        }
        else
            return await interaction.reply(`**${user.tag}** already exists in the manager database.`);
    }

    getRaw(){
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Adds a manager who will be able to manage the client.')
            .addUserOption((option) =>
                option
                    .setName('user')
                    .setDescription('User you would like to add to manager database.')
                    .setRequired(true)
            )
            .toJSON();
    }
}

