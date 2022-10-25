Hello there,

I've created a self-hosted discord bot that can be used to manage your Roblox moderation needs while you're offline. Yes, I've taken inspiration and recreated this bot, however, I've made sure to update it, clean up, and bring some new features to the project. The project I initial took inspiration from was

> **Showcase Video**
![2022-10-24_22-33-09.mkv-vimeo-763652741-hls-akfire_interconnect_quic_sep-923|video](https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/d/f/d/dfd047f4c55515478c68b58ae4c2cdebca6adaaf.mp4


> **How does it work?**

The discord bot is written fully in NodeJS, It does use a few dependencies that are required to run the bot. It also interacts with the Roblox cloud API, to deal with datastores & communicate with the servers.
* Current Dependencies
  * [`discord.js@14.6.0 `](https://discord.js.org/#/)
  * [`superagent@8.0.0`](https://www.npmjs.com/package/superagent)
  * [`dot-json@1.2.2`](https://www.npmjs.com/package/dot-json)
  * [`better-logging@5.0.0`](https://www.npmjs.com/package/better-logging)

> **How to use it?**

1. Head over to the [GitHub repository](https://github.com/workframes/RBLXManager) of this project and clone it.
2. Make sure to buy the [Roblox model](https://www.roblox.com/library/11373427758/RBLX-Manager) as well.
3. Then go and create an API key from the [Creator Dashboard](https://create.roblox.com/credentials). You can read [Managing API Keys](https://create.roblox.com/docs/open-cloud/managing-api-keys) if you get stuck.
4. Then head over to [discord developer portal](https://discord.com/developers/applications) and create your discord bot. Make sure that the bot isn't public so that anyone else won't be able to invite your bot. Also, turn on the **Server Member**  & **Message Content** intents located in the `Bot` tab.
5. Invite your discord bot to just 1 specific server.
6. Get on Roblox Studio and insert the model that you got earlier, It doesn't really matter where the model is inserted to. However, I recommend putting it in `ServerScriptService`.
7. Open your cloned GitHub repository in your preferred IDE such as [VisualStudioCode](https://code.visualstudio.com/) or the default TextEditor.
8. Open the `config.json` file and fill it out accordingly.
    * `TOKEN`, this is the token of the discord bot that you copied from the discord developer portal.
    * `GUILD_ID`, this is the unique id of your discord server.
    * `DATASTORE_NAME`, this will be the name of your datastore on Roblox
    * `UNIVERSE_ID`, this is the unique universe id that you set your API key.
    * `DATASTORE_API_KEY`, this is the unique API key you got from the cloud.
    * Example:
* ```json
  {
    "CLIENT": {
        "TOKEN": "flkjfkjhg4jk4kgkj3224hj3jk3h4jkhrfwehjekw",
        "PREFIX": ";"
    },
    
    "GUILD_ID": "993997612472610927",
     
    "GAME": {
        "DATASTORE_NAME": "RBLXManagerBans",
        "UNIVERSE_ID": 4045014903,
        "DATASTORE_API_KEY": "43242432jlk24kj32hkj2342hg4k3j2gj42g4kj234j2k2",
        "BAN_MESSAGE": "Hello, you have been banned permanently. If you think this was a mistake please contact a moderator to appeal.",
        "KICK_MESSAGE": "Hello, you have been kicked from the server."
    }
  }
  ``` 
9. Now this is where you are a little alone, if you would like you are able to host this bot yourself and there are multiple tutorials on how to do this on youtube. If you'd like to use 3rd-party services to do so go for it! Again there are a bunch of tutorials on how to host a discord bot.

> **Command Documentaion**

* `addManager <DISCORD_ID>`, Adds them to the list of managers and allows them to use the bot.
* `addRole <DISCORD_ROLE_ID>`, Adds the role to the list of role managers and allows people with the role to use the bot.
* `removeManager <DISCORD_ID>`, Removes the user from the manager list.
* `removeROLE <DISCORD_ROLE_ID>`, Removes role from the manager list.
* `managers`, Lists all the current managers, including the roles with manager permissions.
* `ban <ROBLOX_USERID>`, Bans the mentioned player, and kicks them if they are in-game.
* `unban <ROBLOX_USERID>`, Unbans the mentioned player.
* `kick <ROBLOX_USERID>`, Kicks the mentioned player if the user is in a server.
* `isBanned <ROBLOX_USERID>`, Checks the status of the mentioned player.

> **Future Plans**

Yes, I am planning to maintain this project so no one will have to worry about it being outdated for a while. Please make sure to also recommend new features for the bot, and I might consider adding them.


Thank you,
shr2mp
