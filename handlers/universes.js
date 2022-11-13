const { Datastore, Messager } = require('../util/Cloud');
const { GAME } = require('../config.json');

module.exports = async (_CLIENT) => {
    const { client } = _CLIENT;
    let universes = {}

    for(let id in GAME.UNIVERSE_IDS){
        universes[id] = {
            datastore: new Datastore(process.env.CLOUD_API_KEY, id, GAME.DATASTORE_NAME),
            self: new Datastore(process.env.CLOUD_API_KEY, id, "self"),
            messager: new Messager(process.env.CLOUD_API_KEY, id),
            name: GAME.UNIVERSE_IDS[id],
            id: id,
        }
    }

    client.universes = universes;
}