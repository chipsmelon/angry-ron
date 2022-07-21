const { MessageEmbed } = require("discord.js");
const {prefix} = require('../config.json');
const reply = require('../tools/reply');
const randomChoice = require('../tools/randomChoice');
const send = require('../tools/send');
const far = require('../dialogue/far');
const close = require('../dialogue/close');

module.exports = {
    names: ['guessthenumber', 'guess', 'guessnumber', 'guessnum', 'gn', 'the'],
    description: 'Guess a number from one to ten! How bad can it possibly be?',
    usage: '{prefix}guessthenumber <number>',
    quote: 'Level seven. The luckiest number...',
    execute: async (m, args) => {
        if (!args[1]) return reply(m, 'I can\'t read your mind idiot, what number are you even guessing?');
        if (isNaN(Number(args[1]))) return reply(m, 'Guess a ***NUMBER***.');
        const num = Math.floor(Number(args[1]));
        if (num > 10 || num < 1) return reply(m, `One to ten. It says it in ${prefix}help.`);

        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        numbers[num - 1] = (num == 1) ? 2 : num - 1;
        const trollnum = randomChoice(numbers);
        const embed = new MessageEmbed().setTitle('Easy Number Guessing:tm:')
        .setColor('RANDOM')
        .setFooter({text: 'It\'s an easy game, I really don\'t understand why everyone sucks at it.'})
        .setDescription(`My number: **${trollnum}**\nYour number: **${num}**\n\n*${(num - 1 == trollnum || num + 1 == trollnum) ? close.getDialogue() : far.getDialogue()}*`);
        send(m.channel, {embeds: [embed]});
    }
};