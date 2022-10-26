const { Client, GatewayIntentBits,  Collection} = require('discord.js');
const { Datastore, Messager } = require('./util/Cloud');
const { CLIENT, GAME } = require('./config.json');

require('better-logging')(console)
require('dotenv').config()

const _CLIENT = {
    client: new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ]
    }),
    prefix: CLIENT.PREFIX,
    banData: new Datastore(process.env.CLOUD_API_KEY, GAME.UNIVERSE_ID),
    messager: new Messager(process.env.CLOUD_API_KEY, GAME.UNIVERSE_ID)
}

_CLIENT.client.commands = new Collection();
_CLIENT.client.events = new Collection();

_CLIENT.client.loadEvents = (_CLIENT, reload) => require("./handlers/events")(_CLIENT, reload);
_CLIENT.client.loadCommands = (_CLIENT, reload) => require("./handlers/commands")(_CLIENT, reload);
_CLIENT.client.loadEvents(_CLIENT, false);
_CLIENT.client.loadCommands(_CLIENT, false);

_CLIENT.client.login(process.env.TOKEN);
 