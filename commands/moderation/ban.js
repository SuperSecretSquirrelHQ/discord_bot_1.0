module.exports = {
  // Define the objects.
  name: 'ban',
  category: 'moderation',
  aliases: ['banhammer'],
  usage: '<usage>',
  args: true,
  guildOnly: true,
  cooldown: 2,
  description: 'description',

  run: async (client, message, args, user, text, prefix) => {
    message.reply('template command').then;
  }
};
