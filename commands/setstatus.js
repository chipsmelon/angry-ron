const fs = require('fs');
const config = require('../config.json');
const reply = require('../tools/reply');

module.exports = {
    names: ['setstatus', 'ss'],
    description: 'Sometimes we gotta change the bot\'s status.',
    usage: '{prefix}setstatus <statustype> <status: optional>',
    quote: 'Watching Shrek 2.',
    devonly: true,
    execute: async (m, args, client) => {
        const newstatus = args.slice(2).join(' ');

        client.user.setActivity(newstatus + ` | ${config.prefix}help`, {type: args[1]});

        config.status.words = newstatus; // prefixhelp is automatically appended to the status on startup
        config.status.type = args[1];

        fs.writeFile('./config.json', JSON.stringify(config), (err) => {
            if (err) reply(m, String(err));
            reply(m, 'Command done!');
        });
    }
};