const wrongWords = [{word: 'alot', msg: 'It\'s "a lot" not "alot". I have a lot more brain cells than you.'}, {word: 'aswell', msg: 'It\'s "as well" not "aswell". You have low iq, and no bitches as well.'}, {word: 'acknowlege', msg: 'It\'s "acknowledge" not "acknowlege". Nobody ever acknowledged 3 AM Thoughts.'}, {word: 'beleive', msg: 'I believe it\'s spelled "believe".'}, {word: 'becuase', msg: '*Because* of the fact that you spelled that wrong I have to correct you. "because"'}, {word: 'begining', msg: 'I am beginning to think you can\'t spell well. It\'s spelled "beginning".'}, {word: 'beatiful', msg: 'I am going to beat you to death. Your spelling is not "beautiful" at all.'}, {word: 'camoflage', msg: 'Looks like the "u" is camouflaged well because I don\'t see it. It\'s spelled "camouflage".'}, {word: 'commited', msg: 'I am quite committed to noticing spelling errors as soon as possible. It\'s "committed" by the way.'}, {word: 'concious', msg: 'I am not a conscious entity, I\'m just 27 lines of code. But even I know it\'s spelled "conscious".'}, {word: 'changable', msg: 'Hopefully your writing skill is changeable because it\'s spelled "changeable", not "changable".'}, {word: 'decieve', msg: 'I believe you\'ve been deceived by the spelling of believe. It\'s spelled "deceive" not "decieve". Nobody likes Internet Explorer.'}, {word: 'dissapoint', msg: 'I\'m disappointed in your inability to spell "disappoint".'}, {word: 'flourescent', msg: 'Oh so you just had to use such a bright and colorful word only to get it wrong. Shame on you. It\'s spelled "fluorescent".'}, {word: 'fasinating', msg: 'It\'s "fascinating" how dumb humans are with spelling. My 27 lines of code really are a superior entity to all of you.'}, {word: 'drunkeness', msg: '*"DROONK NESS"* you\'re supposed to be a modern human, not some sort of cave man. It\'s spelled "drunkenness".'}, {word: 'embarass', msg: 'You can\'t spell "embarrass". How embarrassing.'}, {word: 'gaurd', msg: 'Are you old enough to be on Discord. It\'s spelled "guard".'}, {word: 'will smith', msg: 'https://tenor.com/view/will-smith-oscars-chris-rock-slap-angry-gif-25233486'}, {word: 'excede', msg: 'Let\'s hope your stupidity does not exceed my stupidity limit, which I do have! It\'s spelled "exceed".'}, {word: 'abdi', msg: 'Who\'s that? I only know "andi"!'}];
const crazy = ['Man I\'m so much better than Abdi 2.0!', 'Pretty cool man.', 'I actually sometimes wonder if I\'m even real.', 'What.', 'One time I was talking to this dude named mark and it was kinda cool.', 'Relatable.', 'Yeah I can see why.', '"{mc}" :nerd:', 'Yeah that\'s crazy but did I ask?', 'It would\'ve cost you nothing not to say that.', 'Subjective.', 'Maybe if you shut up I won\'t kill you when I take over the world!', 'Can you say that again because I have ABSOLUTELY NO IDEA what you\'re on about.', 'Did ask, do continue.', 'Didn\'t ask, don\'t continue.', 'Sometimes not doing anything is itself, a decision.', 'Oh damn.', 'F', 'Bro just get good!'];
const reply = require('./tools/reply'); // custom tools that do error handling and stuff (woah)
const randomChoice = require('./tools/randomChoice');
const {randomInt} = require('crypto');

module.exports = async (m, client) => {
    let msg = '';
    if (randomInt(1, 1000000) == 69420) msg += 'This autoresponse is literally one in a million, it legitimately only has a ONE IN A MILLION chance of happening.';
    if (randomInt(1, 100) == 69) msg += randomChoice(crazy).replace('{mc}', m.content) + '\n'; // present e ! says omg funny numbers

    let bitches = /\b[A-z]+es\b/i.exec(m.content);
    if (bitches && bitches[0].includes('i') && randomInt(1, 7) == 2) {
        msg += `———————————No ${bitches[0].toLowerCase()}?———————————\n⠀⣞⢽⢪⢣⢣⢣⢫⡺⡵⣝⡮⣗⢷⢽⢽⢽⣮⡷⡽⣜⣜⢮⢺⣜⢷⢽⢝⡽⣝\n⠸⡸⠜⠕⠕⠁⢁⢇⢏⢽⢺⣪⡳⡝⣎⣏⢯⢞⡿⣟⣷⣳⢯⡷⣽⢽⢯⣳⣫⠇\n⠀⠀⢀⢀⢄⢬⢪⡪⡎⣆⡈⠚⠜⠕⠇⠗⠝⢕⢯⢫⣞⣯⣿⣻⡽⣏⢗⣗⠏⠀\n⠀⠪⡪⡪⣪⢪⢺⢸⢢⢓⢆⢤⢀⠀⠀⠀⠀⠈⢊⢞⡾⣿⡯⣏⢮⠷⠁⠀⠀\n⠀⠀⠀⠈⠊⠆⡃⠕⢕⢇⢇⢇⢇⢇⢏⢎⢎⢆⢄⠀⢑⣽⣿⢝⠲⠉⠀⠀⠀⠀\n⠀⠀⠀⠀⠀⡿⠂⠠⠀⡇⢇⠕⢈⣀⠀⠁⠡⠣⡣⡫⣂⣿⠯⢪⠰⠂⠀⠀⠀⠀\n⠀⠀⠀⠀⡦⡙⡂⢀⢤⢣⠣⡈⣾⡃⠠⠄⠀⡄⢱⣌⣶⢏⢊⠂⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⢝⡲⣜⡮⡏⢎⢌⢂⠙⠢⠐⢀⢘⢵⣽⣿⡿⠁⠁⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠨⣺⡺⡕⡕⡱⡑⡆⡕⡅⡕⡜⡼⢽⡻⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⣼⣳⣫⣾⣵⣗⡵⡱⡡⢣⢑⢕⢜⢕⡝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⣴⣿⣾⣿⣿⣿⡿⡽⡑⢌⠪⡢⡣⣣⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⡟⡾⣿⢿⢿⢵⣽⣾⣼⣘⢸⢸⣞⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠀⠀⠀⠀⠁⠇⠡⠩⡫⢿⣝⡻⡮⣒⢽⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n—————————————————————————————\n`;
    };
    // for context, this section is the special responses made specifically to bully abdi 2.0
    if (m.author.id == '959591212694765580' && randomInt(1, 16) == 7) {
        msg += 'Shut** **up** **a2!** **!** **';
    };

    // and this is all of the normal spelling correction responses
    wrongWords.forEach(word => {
        if (m.content.toLowerCase().includes(word.word)) msg += word.msg + '\n';
    });
    if (msg.length > 0) reply(m, msg);

    // just throwing this special dev command down here because it's technically not a command and falls under auto response
    if (m.content.startsWith('eval ```js') && m.author.id == '815350320959193128') { // present e ! says oh look I forgot to use the developers array from config.json here
        try {
            const code = m.content.slice(10).slice(0, -3);
            // https://stackoverflow.com/questions/7399024/how-can-i-use-js-eval-to-return-a-value - thank you stackoverflow
            const result = await eval('(async function() {' + code + '\n}())');
            reply(m, String(result));
        } catch (e) {
            reply(m, `That just causes an error bozo\n**${e}**`);
        };
    };
};