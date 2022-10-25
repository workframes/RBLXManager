const DotJson = require('dot-json');

module.exports = {
    name: "addManager",
    managerOnly: true,
    run: async ({ client, message, args, banData, messager }) => {
        if(!args[0]) return await message.reply("Please specify a valid user ID.")
        
        let managers = new DotJson('managers.json');
        const currentData = managers.get("USERS");
        console.log(currentData)
        if(!currentData.includes(String(args[0]))){
            currentData.push(String(args[0]))
            managers.set("USERS", currentData);
            managers.save();
            delete require.cache[require.resolve('../../managers.json')];
            return await message.reply(`Successfuly added a new manager! ${args[0]}`)
        }
        else
            return await message.reply("Manager already exists in the database.")
    }
}