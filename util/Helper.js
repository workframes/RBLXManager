const fs = require('fs');
const superagent = require('superagent');
const { GAME } = require('../config.json');
const { USERS, ROLES } = require('../managers.json');

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending));
};

const roleCheck = (roles) => {
    const { ROLES } = require('../managers.json');

    if(ROLES.length == 0) return false;

    let result = false;

    roles.forEach((role) => {
        if(ROLES.includes(String(role["id"])))
            result = true;
    })

    return result;
}

const userIdToName = (userId) => {
    return superagent("GET", `api.roblox.com/users/${userId}`)
    .then(response => {
        const { body } = response;
        return body.Username;
    })
    .catch(error => {
        return false
    })
}

const userNameToID = (userName) => {
    return superagent("GET", `api.roblox.com/users/get-by-username?username=${userName}`)
    .then(response => {
        const { body } = response;
        return { id: body.Id, name: body.Username };
    })
    .catch(error => {
        return false
    })
}

const universeSlashCommand = () => {
    let universes = []

    for(let id in GAME.UNIVERSE_IDS){
        universes.push({ name: GAME.UNIVERSE_IDS[id], value: id })
    }

    return universes;
}

const managersSlashCommand = () => {
    let managerArray = [];

    for(let manager of USERS){
        managerArray.push({ name: manager, value: manager })
    }

    return managerArray;
}

const rolesSlashCommand = () => {
    let roleArray = [];

    for(let role of ROLES){
        roleArray.push({ name: role, value: role })
    }

    return roleArray;
}

const isNum = (string) => {
    return /\d/.test(string);
}

module.exports = {
    getFiles,
    roleCheck,
    userIdToName,
    universeSlashCommand,
    managersSlashCommand,
    userNameToID,
    isNum,
    rolesSlashCommand
}
