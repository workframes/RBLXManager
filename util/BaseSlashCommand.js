module.exports = class BaseSlashCommand {
    constructor(name, restricted){
        this._name = name
        this._restricted = restricted
    }

    get name(){
        return this._name;
    }

    get isRestricted(){
        return this.restricted;
    }
};