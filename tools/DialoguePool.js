const randomChoice = require('./randomChoice');

module.exports = class DialoguePool { // present e ! says I wanted to create a dialogue system and use it in like everything but I stopped developing the bot around this time
    constructor(words) {
        this.baseDialogue = words;
        this.dialogue = [...this.baseDialogue];
    }
    getDialogue() {
        if (this.dialogue.length <= 0) {
            this.dialogue = [...this.baseDialogue];
        };
        const dialogue = randomChoice(this.dialogue);
        this.dialogue.splice(this.dialogue.indexOf(dialogue), 1);
        return dialogue;
    }
}