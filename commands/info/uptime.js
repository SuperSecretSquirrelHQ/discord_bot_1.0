module.exports = {
  // Define the objects.
  name: 'uptime', // The name of the command.
  category: 'info', // The category the command will be listed at (for the help cmd).
  aliases: [''], // Array of aliases.
  args: false,
  guildOnly: false,
  cooldown: 10, // Set the cooldown, in seconds.
  usage: 'uptime', // An example of how to use the command. <> for required and [] for optional parameters.
  description: 'Returns the duration on how long the Bot is online', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text, prefix
  run: async (client, message, args, user, text, prefix) => {
    // A subfunction to get the time.
    function duration(ms) {
      const sec = Math.floor((ms / 1000) % 60).toString();
      const min = Math.floor((ms / (60 * 1000)) % 60).toString();
      const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
      const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
      return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``;
    }
    message.reply(`:white_check_mark: **${client.user.username}** has been online for ${duration(client.uptime)}`); // Send the uptime
  }
};
