module.exports = {
  // Define the objects.
  name: 'say', // The name of the command.
  category: 'fun', // The category the command will be listed at (for the help cmd).
  aliases: ['sayit'], // Array of aliases.
  args: true,
  guildOnly: false,
  cooldown: 2, // Set the cooldown, in seconds.
  usage: 'say <Text>', // An example of how to use the command. <> for required and [] for optional parameters.
  description: 'The bot says whatever you tell it to say.', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text (args.join(' ') from index.js), prefix.
  run: async (client, message, args, user, text, prefix) => {
    // Everything in here can be a part of the command.
    message.channel.send(text); // You could also do the following: message.channel.send(args.join(" ")). Note: args.join(' ') is the same as the text variable.
    // Another example: message.channel.send(user + "sent the message: " + text).
  }
};
