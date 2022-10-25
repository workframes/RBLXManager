const DotJson = require('dot-json');

module.exports = {
    name: "addRole",
    managerOnly: true,
    run: async ({ client, message, args, banData, messager }) => {
        if(!args[0]) return await message.reply("Please specify a valid role ID.")
        
        let managers = new DotJson('managers.json');
        const currentData = managers.get("ROLES");
        console.log(currentData)
        if(!currentData.includes(String(args[0]))){
            currentData.push(String(args[0]))
            managers.set("ROLES", currentData);
            managers.save();
            delete require.cache[require.resolve('../../managers.json')];
            return await message.reply(`Successfuly added a new role! ${args[0]}`)
        }
        else
            return await message.reply("Role already exists in the database.")
    }
}