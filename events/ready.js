module.exports = (client) => {
    console.log(`Discord Bot ${client.user.tag} is online!`); // Show that the bot is Ready for use.
    // Set the bot's presence
    client.user.setActivity(`Someone Make Toe Jam`, { type: 'WATCHING' }); // First parameter is the status, second is an object with type which can be: "PLAYING", "WATCHING", "LISTENING", "STREAMING" (where you need to add a , and then url: "https://twitch.tv/#")
};
