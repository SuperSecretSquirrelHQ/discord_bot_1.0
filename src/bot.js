require("dotenv").config();

const { Client, WebhookClient } = require('discord.js');

const client = new Client({
  partials: ['MESSAGE', 'REACTION']
});

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN,
);

const PREFIX = "$";

client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
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

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
//#Enter messaged id from the original post
  if (reaction.message.id === 'inital.posted.message.id') {
    switch (name) {
//#Paste emoji below "..."
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

client.login(process.env.DISCORDJS_BOT_TOKEN);
