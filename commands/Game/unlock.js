const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { universeSlashCommand } = require('../../util/Helper');

module.exports = class Unlock extends BaseSlashCommand{
    constructor(){
        super("unlock", true)
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const reason = interaction.options.getString('reason') ?? "Universe was unlocked.";
        
        const self = universe.self;

        const universeInfo = {
            locked: false,
            reason: reason,
            by: interaction.member.user.tag, 
        }

        const success = await self.SetAsync(universe.id, universeInfo);

        if(success)
            return await interaction.reply(`Successfully unlocked **${universe.name}**.`)
        else
            return await interaction.reply(`Failed to unlock **${universe.name}** or failed to notify servers!`);  

    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Unlock the given universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to unlock.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addStringOption((option) => 
                option
                    .setName('reason')
                    .setDescription('Reason you would like to unlock the universe.')
            )
            .toJSON();
    }
}