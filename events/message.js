const { Collection } = require('discord.js'); // Require discord.js for both client messages and collections.
const config = require('../config.json'); // Load the config file with the token and prefix.
const prefix = config.prefix; // Define the prefix as a constant variable.
const cooldowns = new Collection(); // A collection for cooldowns of commands for each user.

// Every time the bot receives a message, this happens.
module.exports = (client, message) => {
  if (message.author.bot) return; // If the message author is a bot, ignore the message.
  if (!message.guild) return; // If the message is not in a guild (in DMs), ignore the message.

  if ((!message.content.startsWith(prefix) && message.content.startsWith(`<@${client.user.id}>`)) || message.content.startsWith(`<@!${client.user.id}>`))
    return message.reply(`My Prefix is: **\`${prefix}\`**, type \`${prefix}help\` for more information!`); // If the message is not a command and someone tags the bot, then send an info message.
  if (!message.content.startsWith(prefix)) return; // If the message does not start with the prefix, return, so only commands are fired.

  const args = message.content.slice(prefix.length).trim().split(/\s+/g); // Create the arguments (each space == 1 arg).
  const cmd = args.shift().toLowerCase(); // Create the command by shifting the arguments by 1.

  if (cmd.length === 0) return; // If there is no command, then return.

  let command = client.commands.get(cmd); // Get the command from the collection.
  if (!command) command = client.commands.get(client.aliases.get(cmd)); // If the command does not exist, try to get it by its alias.

  if (command) {
    if (client.owners.includes(message.author.id)) {
      message.owner = true;
      console.log(`The owner ${message.author.username} issued a command.`);
    } else {
      message.owner = false;
    }
    // If owner, don't set cooldowns.
    if (!message.owner) {
      // If the command is valid.
      if (!cooldowns.has(command.name)) {
        // If the command does not have a cooldown, add one.
        cooldowns.set(command.name, new Collection());
      }

      const now = Date.now(); // Get the current time.
      const timestamps = cooldowns.get(command.name); // Get the timestamp from the last time the command was used.
      const cooldownAmount = (command.cooldown || 1) * 1000; // Get the cooldown amount of the command. If there is no cooldown, there will be a 1 second cooldown added to prevent spam.

      if (timestamps.has(message.author.id)) {
        // If the user is on cooldown.
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // Get the amount of time needed to wait until they can run the command again.

        if (now < expirationTime) {
          // If the person is still on cooldown.
          const timeLeft = (expirationTime - now) / 1000; // Get the time left until the cooldown expires.
          return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`); // Send a message saying there is a cooldown.
        }
      }

      timestamps.set(message.author.id, now); // If the person is not on a cooldown, set one.
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // Set a timeout function with the cooldown, so it gets deleted later on.
    }
    try {
      command.run(client, message, args, message.author, args.join(' '), prefix); // Run the command with the parameters: client, message, args, user, text, prefix. Note: args.join(' ') is actually the text variable.

      /* /////////////////////////////////////////
        HERE AN EXAMPLE:

            User: Tomato#6966   types command:
 
                !say Hello World, HEY!
 
                what you can get from say cmd parameters:
                    client is: the <DiscordClient>
                    message is: the <Message>
                    user is: the <DiscordUser>
                    text is: <everything fter the command:   Hello World, HEY!>
                    prefix is: <config.prefix:   !>
        */ ///////////////////////////////////////////////////////
    } catch (error) {
      console.log(error);
      return message.reply('Something went wrong while, running the: `' + command.name + '` command');
    }
  } // If the command is not found send, say so.
  else return message.reply(`Unkown command, try: **\`${prefix}help\`**`);
};
