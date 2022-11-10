const { Routes } = require('discord.js');
const fs = require('fs');
const { getFiles } = require('../util/helper');
const { CLIENT } = require('../config.json');

module.exports = async (_CLIENT, reload) => {
    const { client } = _CLIENT;
    
    await fs.readdirSync('./commands/').forEach((category) => {
        let commands = getFiles(`./commands/${category}`, '.js');

        commands.forEach((c) => {
            if(reload)
                delete require.cache[require.resolve(`../commands/${category}/${c}`)];
            
            const Command = require(`../commands/${category}/${c}`);
            const cmd = new Command();
            client.slashCommands.set(cmd.name, cmd);
        });
    });

    const rawSlashCommands = client.slashCommands.map((command) => {
        return command.getRaw();
    })

    await client.rest.put(Routes.applicationGuildCommands(CLIENT.APPLICATION_ID, CLIENT.GUILD_ID), {
        body: rawSlashCommands
    })

    const registeredSlashCommands = await client.rest.get(
        Routes.applicationGuildCommands(CLIENT.APPLICATION_ID, CLIENT.GUILD_ID)
    );
};
