const send = require('../tools/send');

module.exports = {
    names: ['ping', 'p', 'pong', 'ms', 'fun'],
    description: 'A fun and engaging command where the bot sends a message along with how long it took to send it in milliseconds!',
    usage: '{prefix}ping',
    quote: "I just don't understand, why is this command not the most popular? It's fun and engaging!",
    execute: async (m) => {
        send(m.channel, 'p').then(pingMessage => {
            pingMessage.m.edit(`Faster than Abdi 2.0! (${pingMessage.m.createdTimestamp - m.createdTimestamp}ms)`).catch(console.log);
        }).catch(console.log);
    }
};