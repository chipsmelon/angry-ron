const reply = require('../tools/reply');
const fs = require('fs');
const {developers} = require('../config.json');

module.exports = {
    names: ['getmessages', 'archive', 'arc', 'getbitches'],
    description: 'After this you should get some bitches as well.',
    usage: '{prefix}getmessages <amount>',
    quote: 'I hate dense people.',
    devonly: true,
    execute: async (m, args) => {
        if (!developers.includes(m.author.id)) return reply(m, 'Back off.');
        let collectedMessages = [];
        let beforem = m.id;
        let amount = +args[1];
        const startingamount = +args[1];
        reply(m, 'starting message collection');
        while (amount > 0) {
            const limitn = (amount > 100) ? 100 : amount;
            const me = await m.channel.messages.fetch({limit: limitn, before: beforem});
            collectedMessages.push(...me.values());
            beforem = me.last().id
            amount -= limitn;
            console.log(`${amount} messages left to fetch`);
        };
        fs.writeFile(`./output${startingamount}.json`, JSON.stringify(collectedMessages), 'utf8', (err) => {
            if (err) throw err;
            reply(m, {content: 'here ya go', files: [`output${startingamount}.json`]});
        });
    }
}