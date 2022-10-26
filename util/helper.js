const fs = require('fs');
const superagent = require('superagent');

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

const shallowClone = (array) => {
    return [...array];
}

module.exports = {
    getFiles,
    roleCheck,
    userIdToName,
    shallowClone
}