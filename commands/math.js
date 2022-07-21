const send = require('../tools/send');
const prec = {'+': 2, '-': 2, '*': 3, '/': 3, '^': 4, '!': 5};
const left = {'+': true, '-': true, '*': true, '/': true, '^': false, '!': false};
class MathToken { // math parsing gets a little bit funky
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    get prece() {
        return prec[this.value];
    }
    get le() {
        return left[this.value];
    }
};

module.exports = { // hello present e ! here don't bully me for this code I know it's funky
    names: ['math', 'ma', 'm'],
    description: 'Math in a discord bot???',
    usage: '{prefix}math <math stuff>',
    quote: '99 + 11 is not 100.',
    execute: async (m, args) => {
        const equation = args.slice(1).join(' ').split('');
        const tokens = [];
        var numberBuffer = [];
        var letterBuffer = [];

        equation.forEach((char, i) => { // tokenizer?????
            var type;

            if (char >= '0' && char <= '9') {
                type = 'literal';
            } else if (char == ' ') {
                return;
            } else if (/\+|-|\*|\/|\^|\!/.test(char)) {
                type = 'operator';
            } else if (char == '(') {
                type = 'leftpr';
            } else if (char == ')') {
                type = 'rightpr';
            } else if (/[a-z]/.test(char)) {
                type = 'letter';
            } else if (char == ',') {
                type = 'separator';
            } else if (char == '.') {
                return numberBuffer.push(char);
            } else {
                type = 'invalid';
            };

            if (type == 'literal') {
                numberBuffer.push(char);
                if (i == equation.length - 1) {
                    tokens.push(new MathToken('literal', +numberBuffer.join(''))); 
                    numberBuffer = [];
                };
                return;
            };
            if (type == 'letter') {
                return letterBuffer.push(char);
            };

            if (numberBuffer.length > 0) {
                tokens.push(new MathToken('literal', +numberBuffer.join(''))); 
                numberBuffer = [];
                if (char == '(') tokens.push(new MathToken('operator', '*'));
            };
            // if (type == 'operator' && char == '-') return mBuffer = true;
            if (letterBuffer.length > 0) {
                tokens.push(new MathToken('function', letterBuffer.join('')));
                letterBuffer = [];
            };

            tokens.push(new MathToken(type, char));
        });
        if (letterBuffer.length > 0) return send(m.channel, 'Become a parentheses user when you use functions, it\'s just a good idea!');

        var rpn = [];
        var stack = [];

        for (const token of tokens) { // shunting yard algorithm???
            if (token.type == 'literal') {rpn.push(token.value); continue;};
            if (token.type == 'function') {stack.push(token); continue;};
            if (token.type == 'separator') {
                while (stack.slice(-1)[0]?.value != '(') {
                    if (!stack.slice(-1)[0]) return send(m.channel, 'That comma is NOT being used correctly!!');
                    rpn.push(stack.slice(-1)[0].value);
                    stack.pop();
                };
            };
            if (token.type == 'operator') {
                const peek = stack.slice(-1)[0];
                if (!peek || peek.value == '(') {stack.push(token); continue;};

                if (peek.prece > token.prece || (peek.prece == token.prece && token.le)) {
                    rpn.push(peek.value);
                    stack.pop();
                };
                stack.push(token);
            };
            if (token.type == 'leftpr') {stack.push(token); continue;};
            if (token.type == 'rightpr') {
                while (stack.slice(-1)[0]?.value != '(') {
                    if (!stack.slice(-1)[0]) return send(m.channel, 'Massive parentheses issue.');
                    rpn.push(stack.slice(-1)[0].value);
                    stack.pop();
                };
                stack.pop();
            };
            if (stack.slice(-1)[0]?.type == 'function') {
                rpn.push(stack.slice(-1)[0].value);
                stack.pop();
            };
            if (token.type == 'invalid') return send(m.channel, `Invalid token '${token.value}'\nTry using valid symbols.`);
        };
        while (stack.length > 0) {
            if (stack.slice(-1)[0].value == '(') return send(m.channel, 'You\'re not using parentheses right bozo.');
            rpn.push(stack.slice(-1)[0].value);
            stack.pop();
        };
        console.log(rpn);

        for (let i = 0;i < rpn.length;i++) { // execution
            const step = rpn[i];
            if (!step) break;
            if (typeof step == 'number') continue;
            if (/\+|\-|\/|\*|\^/.test(step) && rpn.slice(0, i + 1).length < 3) return send(m.channel, `You don't know how to use ${step} eh?`)
            if (step == '+') {
                rpn.splice(i - 2, 3, rpn[i - 2] + rpn[i - 1]);
                i -= 2;
            } else if (step == '-') {
                rpn.splice(i - 2, 3, rpn[i - 2] - rpn[i - 1]);
                i -= 2;
            } else if (step == '*') {
                rpn.splice(i - 2, 3, rpn[i - 2] * rpn[i - 1]);
                i -= 2;
            } else if (step == '/') {
                rpn.splice(i - 2, 3, rpn[i - 2] / rpn[i - 1]);
                i -= 2;
            } else if (step == '^') {
                rpn.splice(i - 2, 3, rpn[i - 2] ** rpn[i - 1]);
                i -= 2;
            } else if (step == 'sqrt') {
                rpn.splice(i - 1, 2, Math.sqrt(rpn[i - 1]));
                i -= 1;
            } else {
                return send(m.channel, 'You\'re probably using an invalid function somewhere, I don\'t understand those letters.')
            };
        };
        if (rpn.includes(NaN)) return send(m.channel, 'You messed up the decimal points idiot.');
        if (rpn.length > 1) return send(m.channel, 'There are a few extra numbers.');

        send(m.channel, rpn.join(''));
    }
};