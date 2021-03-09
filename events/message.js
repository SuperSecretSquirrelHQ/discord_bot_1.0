const commandcheck = require('../Util/commandTrigger.js');
// Every time the bot receives a message, this happens.
module.exports = (client, message) => {
    commandcheck(client, message);
};
