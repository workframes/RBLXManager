const { Client, GatewayIntentBits,  Collection, Routes } = require('discord.js');
const { CLIENT } = require('./config.json');
const slashCommands = require('./handlers/slashCommands');

require('better-logging')(console)
require('dotenv').config()

const _CLIENT = {
    client: new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
        rest:{ version: "10" }
    }),
}


_CLIENT.client.commands = new Collection();
_CLIENT.client.events = new Collection();
_CLIENT.client.slashCommands = new Collection();
_CLIENT.client.universes = {};

_CLIENT.client.loadEvents = (_CLIENT, reload) => require('./handlers/events')(_CLIENT, reload);
_CLIENT.client.loadSlashCommands = (_CLIENT, reload) => require('./handlers/slashCommands')(_CLIENT, reload);
_CLIENT.client.loadUniverses = (_CLIENT) => require('./handlers/universes')(_CLIENT);

_CLIENT.client.loadEvents(_CLIENT, false);
_CLIENT.client.loadSlashCommands(_CLIENT, false);
_CLIENT.client.loadUniverses(_CLIENT);

_CLIENT.client.login(process.env.TOKEN);
 
