module.exports = {
    // Define the objects.
    name: 'deletemessage', // The name of the command.
    category: 'moderation', // The category the command will be listed at (for the help cmd).
    aliases: ['deletemessages'], // Array of aliases.
    hasArgs: true, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
    guildOnly: true, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
    cooldown: 2, // Set the cooldown, in seconds.
    usage: 'deletemessage <Message ID> OR deletemessage <Number of messages>', // An example of how to use the command. <> for required and [] for optional parameters.
    description: 'Delete a specific message, or several if the most recent messages.', // The description of the command.

    run: async (client, message, args, user, text, prefix) => {
        message.reply('template command');
        //   .then();
    },
};
