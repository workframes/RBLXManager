const superagent = require('superagent');

class Datastore{
    constructor(apiKey, universeId){
        this.apiKey = apiKey
        this.universeId = universeId
    }

    async GetAsync(dataStoreName, Key){
        const BASE_URL = `https://apis.roblox.com/datastores/v1/universes/${this.universeId}/standard-datastores/datastore/entries/entry`
        
        return superagent("GET", BASE_URL)
            .set({ "x-api-key": this.apiKey, "content-type": "application/json" })
            .query(`datastoreName=${dataStoreName}&entryKey=${Key}&scope=global`)
            .then(response => {
                const { body } = response;
                return body;
            })
            .catch(error => {
                return false;
            })
    }

    async SetAsync(dataStoreName, Key, newValue){
        const BASE_URL = `https://apis.roblox.com/datastores/v1/universes/${this.universeId}/standard-datastores/datastore/entries/entry`

        return superagent("POST", BASE_URL)
            .set({ "x-api-key": this.apiKey, "content-type": "application/json" })
            .send(newValue)
            .query(`datastoreName=${dataStoreName}&entryKey=${Key}&scope=global`)
            .then(response => {
                const { body } = response;
                return response.status == 200;
            })
            .catch(error => {
                return false;
            })
    }
}

class Messager{
    constructor(apiKey, universeId){
        this.apiKey = apiKey
        this.universeId = universeId
    }
    
    async PostTopic(topic, message){
        const BASE_URL = `https://apis.roblox.com/messaging-service/v1/universes/${this.universeId}/topics/${topic}`

        return superagent("POST", BASE_URL)
            .set({ "x-api-key": this.apiKey, "content-type": "application/json" })
            .send({ "message": message })
            .then(response => {
                const { body } = response;
                return response.status == 200;
            })
            .catch(error => {
                return false;
            })
    }
}


module.exports = { Datastore, Messager }