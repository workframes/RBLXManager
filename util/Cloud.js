const superagent = require('superagent');

class Datastore{
    constructor(apiKey, universeId, datastoreName){
        this._apiKey = apiKey
        this._universeId = universeId
        this._datastoreName = datastoreName
    }

    async GetAsync(Key){
        const BASE_URL = `https://apis.roblox.com/datastores/v1/universes/${this._universeId}/standard-datastores/datastore/entries/entry`
        
        return superagent("GET", BASE_URL)
            .set({ "x-api-key": this._apiKey, "content-type": "application/json" })
            .query(`datastoreName=${this._datastoreName}&entryKey=${Key}&scope=global`)
            .then(response => {
                const { body } = response;
                return body;
            })
            .catch(error => {
                return false;
            })
    }

    async SetAsync(Key, newValue){
        const BASE_URL = `https://apis.roblox.com/datastores/v1/universes/${this._universeId}/standard-datastores/datastore/entries/entry`

        return superagent("POST", BASE_URL)
            .set({ "x-api-key": this._apiKey, "content-type": "application/json" })
            .send(newValue)
            .query(`datastoreName=${this._datastoreName}&entryKey=${Key}&scope=global`)
            .then(response => {
                const { body } = response;
                return response.status == 200;
            })
            .catch(error => {
                console.log(error)
                return false;
            })
    }
}

class Messager{
    constructor(apiKey, universeId){
        this._apiKey = apiKey
        this._universeId = universeId
    }
    
    async PostTopic(topic, message){
        const BASE_URL = `https://apis.roblox.com/messaging-service/v1/universes/${this._universeId}/topics/${topic}`

        return superagent("POST", BASE_URL)
            .set({ "x-api-key": this._apiKey, "content-type": "application/json" })
            .send({ "message": message })
            .then(response => {
                const { body } = response;
                return response.status == 200;
            })
            .catch(error => {
                console.log(error)
                return false;
            })
    }
}


module.exports = { Datastore, Messager }