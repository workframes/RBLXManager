const { SlashCommandBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { universeSlashCommand } = require('../../util/Helper');

module.exports = class Lock extends BaseSlashCommand{
    constructor(){
        super("lock", true)
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const reason = interaction.options.getString('reason') ?? "Universe is locked for maintenances.";

        const self = universe.self;
        const messager = universe.messager;

        const universeInfo = {
            locked: true,
            reason: reason,
            by: interaction.member.user.tag, 
        }

        const messageData = {
            func: "CLOSE_SERVER",
            data: {
                reason: reason
            },
        }

        const success = await self.SetAsync(universe.id, universeInfo);
        const messageSuccess = await messager.PostTopic("RBLXManager", JSON.stringify(messageData));

        if(success && messageSuccess)
            return await interaction.reply(`Successfully locked **${universe.name}**.`)
        else
            return await interaction.reply(`Failed to lock **${universe.name}** or failed to notify servers!`);  
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Lock the given universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you want to lock.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .addStringOption((option) => 
                option
                    .setName('reason')
                    .setDescription('Reason you would like to lock the universe.')
            )
            .toJSON();
    }
}