require('dotenv').config();

// const { Client, WebhookClient } = require('discord.js');

const Discord = require('discord.js');

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

const PREFIX = process.env.PREFIX;

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready and listening!');
});

//? Refactor to commandlist ---------------------------------------------------------------------------------
client.on('message', async (message) => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  // Ignore messages from bots
  if (message.author.bot) return;
  // Check for the prefix
  if (message.content.startsWith(PREFIX)) {
    // Seperate message into array, set first item as command
    const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);
    if (CMD_NAME === 'kick') {
      // Check for kick permission
      if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You do not have permissions to use that command');
      // Check for no argument
      if (args.length === 0) return message.reply('Please provide an ID');

      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
      } else {
        const member = message.guild.members.cache.get(args[0]);
      }
      // Check if member exists in the server where the command was sent from
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You do not have permissions to use that command');

      if (args.length === 0) return message.reply('Please provide an ID');
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully');
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
      }
    } else if (CMD_NAME === 'announce') {
      console.log(args);
      const msg = args.join(' ');
      console.log(msg);
      webhookClient.send(msg);
    }
  }
});
//? Refactor to commandlist ---------------------------------------------------------------------------------

//? Refactor to reaction module ---------------------------------------------------------------------------------
client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  //TODO: Make 'inital.posted.message.id' dynamic
  //TODO: Make Emoji cases dynamic
  if (reaction.message.id === 'inital.posted.message.id') {
    switch (name) {
      //  Paste emoji below "..."
      case '...':
        member.roles.add('role.id.1');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.add('role.id.2');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.add('role.id.3');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.add('role.id.4');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  //TODO: Make 'inital.posted.message.id' dynamic
  //TODO: Make Emoji cases dynamic
  if (reaction.message.id === 'inital.posted.message.id') {
    switch (name) {
      //#Paste emoji below "..."
      case '...':
        member.roles.remove('role.id.1');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.remove('role.id.2');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.remove('role.id.3');
        break;
      //#Paste emoji below "..."
      case '...':
        member.roles.remove('role.id.4');
        break;
    }
  }
});

//? Refactor to reaction module ---------------------------------------------------------------------------------

//? Refactor to reaction module ---------------------------------------------------------------------------------

// Log the bot in
//! Needs to be at the end
client.login(process.env.DISCORDJS_BOT_TOKEN);
