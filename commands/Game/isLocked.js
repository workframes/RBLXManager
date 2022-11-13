const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const BaseSlashCommand = require('../../util/BaseSlashCommand');
const { universeSlashCommand } = require('../../util/Helper');

module.exports = class IsLocked extends BaseSlashCommand{
    constructor(){
        super("islocked", true)
    }

    async run(client, interaction){
        const universe = client.universes[interaction.options.getString('universe')];
        const self = universe.self;

        const universeInfo = await self.GetAsync(universe.id);
        if(!universeInfo) return await interaction.reply("Unable to fetch universe data.");

        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Status of, **${universe.name}**!`)
            .addFields(
                { name: '**Locked**', value: String(universeInfo.locked) },
                { name: '**Reason**', value: universeInfo.reason },
                { name: '**By**', value: universeInfo.by}
            )
            .setTimestamp();

        return await interaction.reply({ embeds: [Embed] });
    }

    getRaw(){
        const currentUniverses = universeSlashCommand();

        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Checks the lock status of the given universe.')
            .addStringOption((option) => 
                option
                    .setName('universe')
                    .setDescription('Universe you would like to check status of.')
                    .setRequired(true)
                    .addChoices(...currentUniverses)
            )
            .toJSON();
    }
}