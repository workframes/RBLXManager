const DotJson = require('dot-json');

module.exports = {
    name: "removeRole",
    managerOnly: true,
    run: async ({ client, message, args, banData, messager }) => {
        if(!args[0]) return await message.reply("Please specify a valid role ID.")
        
        let managers = new DotJson('managers.json');
        let currentData = managers.get("ROLES");

        if(!currentData.includes(String(args[0]))) return await message.reply("Specified role ID does not exist in the database.")

        currentData = currentData.filter(user => user !== args[0]);
        managers.set("ROLES", currentData);
        managers.save();
        delete require.cache[require.resolve('../../managers.json')];
        return await message.reply(`Successfuly removed a role! ${args[0]}`)
    }
}