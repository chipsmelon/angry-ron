const { MessageEmbed } = require('discord.js');
const reply = require('../tools/reply');
const send = require('../tools/send');
const {prefix} = require('../config.json');

module.exports = {
    names: ['help', 'h', 'hell'],
    description: "Come on, do you really need a description for the help command? You're using it right now fool.",
    usage: '{prefix}help <optional: command>',
    quote: 'Looks like e ! actually added a help command this time.',
    execute: async (m, args, client, commands) => {
        var embed;
        if (args[1]) {
            for (const command of commands) {
                if (command.names.includes(args[1])) {
                    var helpingCommand = command;
                    break;
                };
            };
            if (!helpingCommand) return reply(m, "Why would you think that command even exists.");
            embed = new MessageEmbed().setTitle(helpingCommand.names[0])
            .setDescription(`*${helpingCommand.description}*\n\nUsage: \`${helpingCommand.usage.replace('{prefix}', prefix)}\`\nAliases: ${helpingCommand.names.join(', ')}`)
            .setFooter({text: `"${helpingCommand.quote}"`})
            .setColor('RANDOM');
        } else {
            let desc = '';
            for (const command of commands) {desc += `\`${command.names[0]}\` `};
            embed = new MessageEmbed().setTitle('The Commands:tm:')
            .setColor('RANDOM')
            .setDescription(desc).setFooter({text: `Use '${prefix}help <command>' to learn more about a command.`});
        };
        send(m.channel, {embeds: [embed]});
    }
};