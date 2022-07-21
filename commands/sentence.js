const send = require('../tools/send');
const randomChoice = require('../tools/randomChoice');

module.exports = {
    names: ['sentence', 'notnewidentity', 'se', 'cent'],
    description: 'An original idea not inspired by anything else! Generates a randomized sentence.',
    usage: '{prefix}sentence',
    quote: 'I just love creating new id- I mean sentences.',
    execute: async (m) => { // present e ! says we don't talk about the variable names here
        const sentences = ["{name} {actioned} {noun}.", "{name} decided to {action} {noun}.", "{name} finally {actioned} {noun}.", "{name} really wants to {action} {noun}.", "My name is {name}, and I {actioned} {noun}.", "You really look like {name}, that\'s why I {actioned} {noun}.", "{name} {actioned} me so I'm gonna {action} {name}.", "They... {actioned} {noun}. They actually {actioned} {noun}...", "I am about to {action} {name}.", "{noun} {actioned} {name}.", "{name} is gonna {action} us all...", "Nobody can stop {name} from deciding to {action} {noun}."];
        const nouns = ['the moon', 'some cheese', 'a banana', 'some chips', 'a biscuit', 'a monkey', 'an apple', 'your mother', 'the clown', 'the grim reaper', 'my keyboard', 'Russia', 'America', 'the United Kingdom', 'the world', 'the mainframe'];
        const actions = ['piss on', 'kill', 'obliterate', 'rebuild', 'lick', 'eat', 'shart on', 'scream at', 'gaze at', 'devour', 'steal', 'brighten', 'slap', 'punch', 'hack', 'fuck', 'recreate', 'date', 'release', 'worship'];
        const actioneds = ['pissed on', 'killed', 'obliterated', 'rebuilt', 'licked', 'ate', 'sharted on', 'screamed at', 'gazed at', 'devoured', 'stole', 'brightened', 'slapped', 'punched', 'hacked', 'fucked', 'recreated', 'dated', 'released', 'worshipped'];
        const names = ['Abdi 2.0', 'Gru', 'Angry Ron', 'Your Mother', 'Abdi', 'e !', 'Obama', 'Sonic', 'Goku', 'Sans', 'Papyrus', 'Bob', 'Dave', 'Will', 'Abdi Man Abdi', 'Mother', 'Dank Memer', 'Li\'l papa', 'Biscuit Jr.', 'Hackerman', 'Scott', 'German Man', 'Dhar Mann'];
        
        let sentence = randomChoice(sentences)
        .replaceAll('{name}', randomChoice(names))
        .replaceAll('{actioned}', randomChoice(actioneds))
        .replaceAll('{action}', randomChoice(actions))
        .replaceAll('{noun}', randomChoice(nouns));
        send(m.channel, sentence);
    }
};