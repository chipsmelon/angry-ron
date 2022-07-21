const send = require('../tools/send');

module.exports = {
    names: ['insuklt', 'ins', 'insert', 'in', 'asple'],
    description: 'he he he',
    usage: '{prefix}insuklt',
    quote: "Stab bozo's too!",
    execute: async (m) => {
        send(m.channel, 'I didn\'t agree to saying any of that e ! forced me to do it also I hate ar.plep!');
    }
};