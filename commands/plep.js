const reply = require('../tools/reply');
const {randomInt} = require('crypto');

module.exports = {
    names: ['plep', 'ple', 'fun!'],
    description: 'Is this the height of bot content? Have we reached the limit of being fun and engaging? Is Angry Ron forever superior to Abdi 2.0?',
    usage: '{prefix}plep',
    quote: ":3",
    execute: async (m, args) => {
        reply(m, ':3');
    }
};