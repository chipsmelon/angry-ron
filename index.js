const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});
const {token, prefix, status, developers, treedee} = require('./config.json');
/*
    token - a string for the bot's token
    prefix - a string for the bot's command prefix
    status - an object used for saving the bot's custom status (status.words is the contents of the status and status.type is the PLAYING, WATCHING etc part)
    developers - an array of the ids of developers of the bot
    treedee - boolean for whether or not the bot is the developer testing version
*/
const angryRonObserve = require('./autoresponse');
const fs = require('fs');

const commands = [];
fs.readdirSync('./commands').filter(f => f.endsWith('.js')).forEach(file => {
    commands.push(require(`./commands/${file}`));
});
const cmdsNoDev = commands.filter(c => !c.devonly);
var why = {}; // present e ! says I really should've used a map for this, also this stores timestamps for when people triggered the "why" response (mapped to their user id)

client.once('ready', function yes() {
    console.log(`${client.user.tag} is ready`);
    client.user.setActivity(`${status.words} | ${prefix}help`, {type: status.type});
});

client.on('messageCreate', async function spellchecking(m) {
    if (treedee && !developers.includes(m.author.id)) return;
    if (m.content.toLowerCase().startsWith('why') && !m.author.bot) { // present e ! says I made this run first because I had a rivalry with a2! and wanted to flex 'fast ping' on a2!
        const wh = await m.channel.send('Because I have faster ping than Abdi 2.0.');
        const now = Date.now();

        why[m.author.id] = why[m.author.id] || 0;
        if (why[m.author.id] + 10000 > now) wh.delete().catch(e => console.log('lmao a why delete failed'));
        why[m.author.id] = now;
    };
    
    if (!m.content || (m.author.bot && m.author.id != '959591212694765580')) return; // present e ! says the '959591212694765580' id is a2! (rival bot)
    angryRonObserve(m, client); // autoresponse.js !!
    
    if (!m.content.toLowerCase().startsWith(prefix)) return;

    const args = m.content.slice(prefix.length).replace(/ +/g, ' ').split(' ');
    var cpass;

    if (!developers.includes(m.author.id)) {cpass = cmdsNoDev} else {cpass = commands};
    for (const command of cpass) {
        if (command.names.includes(args[0]?.toLowerCase())) {
            command.execute(m, args, client, cpass).catch(e => {console.log(e);});
            break;
        };
    };
});

client.login(token);