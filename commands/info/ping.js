module.exports = {
  // Define the objects.
  name: 'ping', // The name of the command.
  category: 'info', // The category the command will be listed at (for the help cmd).
  aliases: ['latency'], // Array of aliases.
  hasArgs: false, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
  guildOnly: false, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
  cooldown: 2, // Set the cooldown, in seconds.
  usage: 'ping', // An example of how to use the command. <> for required and [] for optional parameters.
  description: 'Gives the latency (in ms) of the bot to you.', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text, prefix.
  run: async (client, message, args, user, text, prefix) => {
    const msg = await message.channel.send(`🏓 Pinging....`); // Create a temporary message.

    // Edit the message to return the latency. Note: tabs are reflected in the message.
    msg.edit(`🏓 Pong!
        Ping is ${Math.round(client.ws.ping)}ms`);
  }
};
