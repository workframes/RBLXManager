const { getFiles } = require('../util/helper');
const fs = require('fs');

module.exports = (_CLIENT, reload) => {
    const { client } = _CLIENT;
    
    fs.readdirSync('./commands/').forEach((category) => {
        let commands = getFiles(`./commands/${category}`, '.js');

        commands.forEach((c) => {
            if(reload)
                delete require.cache[require.resolve(`../commands/${category}/${c}`)];
            
            const command = require(`../commands/${category}/${c}`);
            client.commands.set(command.name.toLowerCase(), command);
        });
    });
};
