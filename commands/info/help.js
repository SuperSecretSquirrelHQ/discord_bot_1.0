const { MessageEmbed } = require('discord.js'); // Require discord.js for embeded messages.
const { stripIndents } = require('common-tags'); // Require common-tags for stripping indents in messages.
const config = require('../../config.json'); // Load the config file with the token and prefix.

module.exports = {
  // Define the objects.
  name: 'help', // The name of the command.
  category: 'info', // The category the command will be listed at (for the help cmd).
  aliases: ['h', 'commandinfo'], // Array of aliases.
  hasArgs: false, // Whether the command requires arguments. Example: uptime and ping do not require arguments.
  guildOnly: false, // Whether the command can only be used in a guild. Example: You can run the ping command in a DM, as it doesn't require a server. You cannot run the kick command in a DM, as you cannot kick someone from a DM.
  cooldown: 5, // Set the cooldown, in seconds.
  usage: 'help [Command]', // An example of how to use the command. <> for required and [] for optional parameters.
  description: 'Returns all commands. If specified, it will return all details of a specific command.', // The description of the command.

  // A subfunction that runs the command with the following parameters: client, message, args, user, text, prefix.
  run: async (client, message, args, user, text, prefix) => {
    if (args[0]) {
      // If there are arguments, then return the help command. Example: "$help say".
      return getCMD(client, message, args[0]);
    } else {
      // If there are not arguments, then return all commands. Example: "$help".
      return getAll(client, message);
    }
  }
};

// Function for getting all commands.
function getAll(client, message) {
  const embed = new MessageEmbed() // Define the embed.
    .setColor('ORANGE')
    .setThumbnail(client.user.displayAvatarURL())
    .setTitle('HELP MENU')
    .setFooter(`To see a command's description and other information, type: ${config.prefix}help [command]`, client.user.displayAvatarURL());
  // Pass in value is client, initiated from index.js.
  const commands = (category) => {
    // Find all commands and listing them into a string. Then, filter and map, and join them together again.
    return (
      client.commands
        .filter((cmd) => cmd.category === category)
        //TODO: Add another filter to not display certain categories, unless command is issued in a specific channel.
        .map((cmd) => `\`${cmd.name}\``)
        .join(' ')
    );
  };
  // Get the command infostring.                                   Discord formatting below
  const info = client.categories.map((cat) => stripIndents`**__${cat[0].toUpperCase() + cat.slice(1)}__**\n> ${commands(cat)}`).reduce((string, category) => string + '\n' + category);
  // Send the embed with the description.
  return message.channel.send(embed.setDescription(info));
}

// Function to get all commands.
function getCMD(client, message, input) {
  const embed = new MessageEmbed(); // Create a new Embed
  const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())); // Get the command by name or alias.

  if (!cmd) {
    // If the command isn't found, return saying no info was found.
    return message.channel.send(embed.setColor('RED').setDescription(`No Information found for the following command: **${input.toLowerCase()}**`));
  }

  if (cmd.name) embed.addField('**Command name**', `\`${cmd.name}\``);

  if (cmd.description) embed.addField('**Description**', `\`${cmd.description}\``);

  if (cmd.aliases) embed.addField('**Aliases**', `\`${cmd.aliases.map((a) => `${a}`).join('`, `')}\``);

  if (cmd.cooldown) embed.addField('**Cooldown**', `\`${cmd.cooldown} Seconds\``);
  else embed.addField('**Cooldown**', `\`1 Second\``);

  if (cmd.usage) {
    embed.addField('**Usage**', `\`${config.prefix}${cmd.usage}\``);
    embed.setFooter('Syntax: <> = required, [] = optional');
  }

  // Send the new Embed
  return message.channel.send(embed.setColor('ORANGE'));
}
