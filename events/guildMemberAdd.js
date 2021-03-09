module.exports = async (client, member) => {
    // Reaction to when a member joins a server, make sure to have GuildMemberIntents active in discord.com/developers
    console.log(`Name: ${member.displayName} UserID: ${member} joined the server: ${member.guild.name} at ${member.joinedAt}`);
};
