const commandcheck = require('../Util/commandTrigger.js');
// Every time the bot receives a message, this happens.
module.exports = async (client, message) => {
    try {
        await commandcheck(client, message);
    } catch (error) {
        console.error(error);
    }
};
