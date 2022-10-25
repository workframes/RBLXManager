const { getFiles } = require('../util/helper');

module.exports = (_CLIENT, reload) => {
    const { client } = _CLIENT;

    let events = getFiles('./events/', '.js');
    
    events.forEach((e, c) => {
        if(reload)
            delete require.cache[require.resolve(`../events/${e}`)];
        
        const event = require(`../events/${e}`);
        client.events.set(event.name, event);
    });

    if(!reload)
        initEvents(_CLIENT);
};

function triggerEventHandler(_CLIENT, event, ...args){
    const { client } = _CLIENT;

    try{
        if(client.events.has(event))
            client.events.get(event).run(_CLIENT, ...args);
        else
            throw new Error(`Event ${event} does not exist`);
    }
    catch(err){
        console.error(err)
    };
};

function initEvents(_CLIENT){
    const { client } = _CLIENT;

    client.on('ready', () => {
        triggerEventHandler(_CLIENT, 'ready');
    });

    client.on('messageCreate', (message) => {
        triggerEventHandler(_CLIENT, 'messageCreate', message);
    });
};