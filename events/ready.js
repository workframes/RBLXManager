

module.exports = {
    name: 'ready',
    run: async (_CLIENT) => {
        const { client } = _CLIENT 
        console.log(`${client.user.tag}, is running.`)
    }
};