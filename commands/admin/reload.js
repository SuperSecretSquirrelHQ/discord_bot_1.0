const commandHandler = require('../../handlers/command.js');
const eventHandler = require('../../handlers/events.js');

module.exports = {
  //* Define the objects.
  name: 'reload', // The name of the command.
  category: 'admin', // The category the command will be listed at (for the help cmd).
  aliases: ['refresh'], // Array of aliases.
  args: false, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
  guildOnly: false, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
  usage: 'reload [command|event]', // An example of how to use the command. <> for required and [] for optional parameters.
  cooldown: null, // Set the cooldown, in seconds.
  description: 'Runs the handlers to refresh command and event changes.', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text (args.join(' ') from index.js), prefix.
  run: async (client, message, args, user, text, prefix) => {
    if (args) {
      //* This is not the 'reload' command. It is the command we want to reload
      const command = client.commands.get(args[0]);
      if (!client.commands.has(command)) {
        return message.reply('That command does not exist, so we can not reload it.');
      } else if (args == 'events' || 'event') {
        eventHandler(client);
        message.channel.send(`Events have been reloaded`);
      } else if (args == 'command' || 'commands') {
        commandHandler(client);
        message.channel.send(`Commands have been reloaded`);
      } else {
        //TODO: Allow single command to be refreshed, instead of all commands every time.
        commandHandler(client, command);
        message.channel.send(`Command ${command} has been reloaded`);
      }
    } else {
      commandHandler(client);
      eventHandler(client);
      message.channel.send(`All commands and Events have been reloaded`);
    }
  }
};
