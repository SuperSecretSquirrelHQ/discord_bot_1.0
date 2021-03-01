# Discord Emoji Log Bot

[![Discord](https://discordapp.com/api/guilds/(GUILD_ID)/embed.png)](https://discord.gg/(INVITE_CODE)) 


A Discord bot that logs user emoji usage.

> Be aware that while the Google Sheets API has a free tier, it has limits in place. You can read more about the API limits [here](https://developers.google.com/sheets/api/limits) and the document limits [here](https://support.google.com/drive/answer/37603).

> Given that a Google Sheets document supports up to 5000000 cells and the main `logs` table has 5 columns, that gives us appromixately 1000000 rows. If we assume a rate of 500 logs per day, that gives us approximately 5.5 years before we have to consider archiving rows.

## Google Sheets Setup

- Follow the [setup instructions](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account) found in the project [google-spreadsheet](https://github.com/theoephraim/node-google-spreadsheet) to create a Google Sheets API Service Account.

> Take note of the client email associated with the Service Account. Additionally, you will have downloaded a credentials JSON file after following through the instructions. You will need these in the next section.

- Create a Google Sheets document in your Google Drive.

- Click the green `Share` button and share the file with the client email associated with the Service Account.

> Make sure the Service Account has edit access to this file or the bot will not be able to log data!

## Setup

- Copy the `client_email` and `private_key` values in the credentials JSON file into your `.env` file:

```
CLIENT_EMAIL=client_email_value_here
PRIVATE_KEY=private_key_value_here
```

> `npm i -s emoji-regex@^9.0.0 google-spreadsheet@^3.0.11` to install this widget's dependencies.

- Open [config.js](/blob/master/config.js) to configure your own settings:

```
sheetId: "SHEET_ID",
guildChannelMap: {
  'GUILD_1_ID': {
    channelsToIgnore: ['TEXT_CHANNEL_1_ID', 'TEXT_CHANNEL_2_ID']
  },
  // ...Add as many guild-channel mappings as you want.
}
```

- `sheetId` is the ID of the Google Sheets document found in the URL: [https://docs.google.com/spreadsheets/d/SHEET_ID_FOUND_HERE/edit](https://docs.google.com/spreadsheets/d/SHEET_ID_FOUND_HERE/edit).

- `channelsToIgnore` are the channels the bot will not log user emoji usage from.