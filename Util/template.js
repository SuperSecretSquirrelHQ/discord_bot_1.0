module.exports = {
  //* Define the objects.
  name: 'commandname', // The name of the command.
  category: 'category', // The category the command will be listed at (for the help cmd).
  aliases: ['alias'], // Array of aliases.
  hasArgs: null, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
  guildOnly: null, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
  usage: '<usage>', // An example of how to use the command. <> for required and [] for optional parameters.
  cooldown: null, // Set the cooldown, in seconds.
  description: 'description', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text (args.join(' ') from index.js), prefix.
  run: async (client, message, args, user, text, prefix) => {
    // Everything in here can be a part of the command.
    message.reply('template command');
  }
};
