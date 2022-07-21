const reply = require('../tools/reply');
const { Permissions } = require('discord.js');

module.exports = {
    names: ['purge', '1984', 'pu'],
    description: 'This command deletes a specified amount of messages in the channel you use it in, but you have to be allowed to manage messages of course.',
    usage: '{prefix}purge <amount of messages to delete>',
    quote: 'Literally 1984.',
    execute: async (m, args) => {
        if (!m.channel.permissionsFor(m.member).has(Permissions.FLAGS.MANAGE_MESSAGES)) return reply(m, 'You are NOT ALLOWED to fuck this channel\'s messages.');

        if (!args[1]) return reply(m, 'You can purge :)');
        if (isNaN(+args[1])) return reply(m, 'That\'s not a number bozo.'); // unary plus is an operator that quickly converts something to a number -- present e ! says thanks can you add this comment in all the other files you used unary plus in too (please don't actually)

        const amount = Math.abs(Math.floor(+args[1]));

        if (amount > 100) return reply(m, `"Discord only allows you to fetch 100 messages at a time so I'll add amounts over 100 later." - e !`); // present e ! says *they did not add amounts over 100 later*
        if (amount == 0) return reply(m, "Ok, I did nothing!");

        await m.delete().catch(e => {console.log('dord')}); // present e ! says I actually got the dord message in my console once it was crazy

        const messages = await m.channel.messages.fetch({limit: amount});

        m.channel.bulkDelete(messages).catch(e => {reply(m, `${e}`)});
    }
};