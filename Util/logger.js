bot.on('message', function (message) {
    console.log('Channel:' + ' ' + 'Author:' + ' ' + 'Message:');
    if (message.content.includes(client.commands)) {
        console.log('Message:' + message.content);
        console.log('Message ID:' + message.id);
        console.log('Author ID:' + message.author.id);
        console.log('Channel ID:' + message.channel.id);
        var botlog = `Message + Id: + ${message.id} + | + Author + Id: + ${message.author.id} + | + Message + Channel Id: ${message.channel.id} + | + Message: + ${message.content}`;
        fs.writeFile('botlog.txt', `${botlog}`);
    }
});
