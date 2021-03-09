const { readdirSync } = require('fs'); // Require FS for reading files and getting their inputs.
const ascii = require('ascii-table'); // Require ascii-table for creating ascii tables.

let table = new ascii('Commands'); // Create a new table with the name "Commands".
table.setHeading('Command', 'Status');

console.log('Welcome to SERVICE HANDLER'); // Log that the table loads.

module.exports = (client, reloadArg) => {
  if (reloadArg) {
    table.clearRows();
    // Find each directory/category in the command folder.
    readdirSync('./commands/').forEach((dir) => {
      // Find each command file in each directory/category.
      const commandFiles = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js')); // It will be only a command if it ends with .js.
      for (let file of commandFiles) {
        let command = require(`../commands/${dir}/${file}`); // Load the command object.
        if (command.name === reloadArg.name) {
          // Check if the file is the command we want to reload.
          client.commands.set(command.name, command); // Overwrite the command in the command collection.
          table.addRow(file, 'Reloaded'); // Log in the table that the command is ready.
        } else {
          table.addRow(file, `Not Reloaded`); // If something goes wrong, log an error.
          continue; // Go to the next file.
        }
      }
    });
  } else {
    table.clearRows();
    // Find each directory/category in the command folder.
    readdirSync('./commands/').forEach((dir) => {
      // Find each command file in each directory/category.
      const commandFiles = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js')); // It will be only a command if it ends with .js.
      for (let file of commandFiles) {
        // For each file which is a command.
        let command = require(`../commands/${dir}/${file}`); // Load the command object.
        if (command.name) {
          client.commands.set(command.name, command); // Register the command in the command collection under its name.
          table.addRow(file, 'Ready'); // Log in the table that the command is ready.
        } else {
          //?                     Does this error message need changed?
          table.addRow(file, `error -> missing a command.name, or command.name is not a string.`); // If something goes wrong, log an error.
          continue; // Go to the next file.
        }
        if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name)); // If there are aliases link the alias to a command in the alias collection.
      }
    });
  }
  console.log(table.toString()); // Show the table.
};
