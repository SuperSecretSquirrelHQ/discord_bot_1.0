require('dotenv').config(); // Require dotenv file for hidden configs.
//Modules
const { Client, Collection } = require('discord.js'); // Require discord.js for both client messages and collections.
// const config = require('./config.json'); // Load the config file with the token and prefix.
const fs = require('fs'); // Require FS for reading files and getting their inputs.
const eventHandler = require('./handlers/events.js');
const commandHandler = require('./handlers/command.js');

const client = new Client({
  disableEveryone: true, // Disable the bot from tagging @everyone.
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'] // Create the client with partials, so you can fetch OLD messages.
});

client.commands = new Collection(); // A collection (like a digital map (database)) for all of the commands.
client.aliases = new Collection(); // A collection for all of the command aliases.
client.categories = fs.readdirSync('./commands/'); // Categories.
client.owners = process.env.OWNERS.split(','); // All owner IDs.

eventHandler(client, 'init'); // Event Handler.
commandHandler(client, 'init'); // Command Handler.

console.log('Logging into the BOT...'); // Show loading status.
//! Needs to be at the end
client.login(process.env.DISCORDJS_BOT_TOKEN);
// client.login(config.DISCORDJS_BOT_TOKEN)
