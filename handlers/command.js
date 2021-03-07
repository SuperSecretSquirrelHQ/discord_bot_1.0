const { readdirSync } = require('fs'); // Require FS for reading files and getting their inputs.
const ascii = require('ascii-table'); // Require ascii-table for creating ascii tables.

let table = new ascii('Commands'); // Create a new table with the name "Commands".
table.setHeading('Command', 'Load status');

console.log('Welcome to SERVICE HANDLER'); // Log that the table loads.

module.exports = (client) => {
  readdirSync('./commands/').forEach((dir) => {
    // Read each command.
    const commandFiles = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js')); // It will be only a command if it ends with .js.
    for (let file of commandFiles) {
      // For each file which is a command.
      let command = require(`../commands/${dir}/${file}`); // Get information.
      if (command.name) {
        client.commands.set(command.name, command); // Set the name of the command.
        table.addRow(file, 'Ready'); // Log in the table that it is ready.
      } else {
        //?                     Does this error message need changed?
        table.addRow(file, `error -> missing a command.name, or command.name is not a string.`); // If something goes wrong, throw an error.
        continue; // .. And skip.
      }
      if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name)); // If there are aliases, do the same as above.
    }
  });
  console.log(table.toString()); // Show the table.
};
