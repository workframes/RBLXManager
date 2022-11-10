const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { managersSlashCommand } = require('../../util/Helper');
const DotJson = require('dot-json');

module.exports = class RemoveManager extends BaseSlashCommand{
    constructor(){
        super('removemanager', true)
    }

    async run(client, interaction){
        const user = interaction.options.getString('user');
        const managers = new DotJson('managers.json');
        let currentManagers = managers.get('USERS');

        if(!currentManagers.includes(user)) 
            return await interaction.reply(`Specified user does not exist in the manager database.`)

        currentManagers = currentManagers.filter(_user => _user !== user);

        managers.set('USERS', currentManagers);
        managers.save();

        delete require.cache[require.resolve('../../managers.json')];
        return await interaction.reply(`Successfuly removed **${user}** from the manager database.`);
    }

    getRaw(){
        const currentManagers = managersSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Removes a manager from the manager database.')
            .addStringOption((option) =>
                option
                    .setName('user')
                    .setDescription('User you would like to remove from manager database.')
                    .setRequired(true)
                    .addChoices(...currentManagers)
            )
        .toJSON();
    }
}