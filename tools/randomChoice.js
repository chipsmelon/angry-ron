const {randomInt} = require('crypto');
module.exports = (array) => {return array[randomInt(array.length)]};