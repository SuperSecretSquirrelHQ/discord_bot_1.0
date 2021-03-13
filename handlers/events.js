const fs = require('fs'); // Require FS for reading files and getting their inputs.
const ascii = require('ascii-table'); // Require ascii-table for creating ascii tables.
const { removeListener } = require('process');

let table = new ascii('Events'); // Create a new table with the name "Commands".
table.setHeading('Events', 'Status');

module.exports = async (client) => {
    let theevents; // This is a global variable.
    fs.readdirSync('./events/').forEach((file) => {
        // Read each command.
        theevents = fs.readdirSync(`./events/`).filter((file) => file.endsWith('.js')); // It will be only a command if it ends with .js.

        fs.readdir('./events/', (err, files) => {
            // For each file, we will "LOAD THE EVENT".
            if (err) return console.error(err); // If there is an error, log it.
            delete require.cache[require.resolve(`../events/${file}`)];
            const event = require(`../events/${file}`); // Create the event from the file name.
            let eventName = file.split('.')[0]; // Get the event name from the file name.
            theevents = eventName; // Set the event name to the global variable.
            //! If we had multiple listeners to one event name, this must be changed.
            client.removeAllListeners(eventName);
            client.on(eventName, event.bind(this, client)); // LOAD THE EVENT
        });
    });

    // Now that we have an array for all events in the event folder, we can load it in a loop and pass it onto our table.
    table.clearRows();
    for (let i = 0; i < theevents.length; i++) {
        table.addRow(theevents[i], 'Ready'); // Log in the table that it is ready.
    }
    console.log(table.toString()); // Show the table.
};
