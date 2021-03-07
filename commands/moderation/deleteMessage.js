module.exports = {
  // Define the objects.
  name: 'deletemessage',
  category: 'moderation',
  aliases: ['deletemessages'],
  usage: '<usage>',
  args: true,
  guildOnly: true,
  cooldown: 2,
  description: 'description',

  run: async (client, message, args, user, text, prefix) => {
    message.reply('template command');
    //   .then();
  }
};
