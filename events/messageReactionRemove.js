module.exports = async (client, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch(); // If it is a partial message, try to get as much info as possible.
    if (reaction.partial) await reaction.fetch(); // If it is a partial message, try to get as much info as possible.
    if (user.bot) return; // Do nothing if it is a bot reacting.
    if (!reaction.message.guild) return; // Make sure the reaction is on a message within the server.

    console.log('A reaction has been removed');
};
