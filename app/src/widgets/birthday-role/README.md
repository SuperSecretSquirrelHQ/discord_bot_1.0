# Discord Birthday Role Bot

[![Discord](https://discordapp.com/api/guilds/(GUILD_ID)/embed.png)](https://discord.gg/(INVITE_CODE)) 

A Discord bot that assigns members a birthday role based on their account creation date or server join date.

## Setup

Open [config.js] /blob/master/config.js) to configure your own settings:

```js
guildRoleMap: {
  'GUILD_ID': {
    account: 'ACCOUNT_BIRTHDAY_ROLE_ID',
    server: 'SERVER_BIRTHDAY_ROLE_ID'
  },
  // ...Add as many guild-role mappings as you want.
}
```