//here the event starts
module.exports = (client) => {
  console.log(`Discord Bot ${client.user.tag} is online!`); //log when ready aka the bot usable
  client.user.setActivity(`Making Toe Jam`, { type: 'PLAYING' }); //first parameter, is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")
};
