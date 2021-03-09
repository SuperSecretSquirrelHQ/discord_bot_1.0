require('dotenv').config(); // Require dotenv file for hidden configs.
//Modules
const { Client, Collection } = require('discord.js'); // Require discord.js for both client messages and collections.
const fs = require('fs'); // Require FS for reading files and getting their inputs.
const eventHandler = require('../../handlers/events.js');
const commandHandler = require('../../handlers/command.js');

module.exports = {
  //* Define the objects.
  name: 'restart', // The name of the command.
  category: 'admin', // The category the command will be listed at (for the help cmd).
  aliases: [], // Array of aliases.
  hasArgs: false, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
  guildOnly: false, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
  usage: 'restart', // An example of how to use the command. <> for required and [] for optional parameters.
  cooldown: null, // Set the cooldown, in seconds.
  description: 'Kills the client, ends the connection, remakes the client, and reconnects.', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text (args.join(' ') from index.js), prefix.
  run: async (client, message, args, user, text, prefix) => {
    client.destroy();

    client = new Client({
      disableEveryone: true, // Disable the bot from tagging @everyone.
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'] // Create the client with partials, so you can fetch OLD messages.
    });

    client.commands = new Collection(); // A collection (like a digital map (database)) for all of the commands.
    client.aliases = new Collection(); // A collection for all of the command aliases.
    client.categories = fs.readdirSync('./commands/'); // Categories.
    client.owners = process.env.OWNERS.split(','); // All owner IDs.

    eventHandler(client); // Event Handler.
    commandHandler(client); // Command Handler.

    console.log('Relogging into the BOT...'); // Show loading status.
    //! Needs to be at the end
    client.login(process.env.DISCORDJS_BOT_TOKEN);
  }
};
