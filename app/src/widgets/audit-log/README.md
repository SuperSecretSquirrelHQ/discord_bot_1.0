# Discord Audit Log Bot

[![Discord](https://discordapp.com/api/guilds/(GUILD_ID)/embed.png)](https://discord.gg/(INVITE_CODE))

A Discord bot that fills in the gaps in Discord's Audit Log.

|                                                                                                                                                                    |                                                                                                                                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|           <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Message edit</p>           |           <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Message delete</p>           |
| <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Message edit with image</p> | <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Message delete with image</p> |
|            <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Member join</p>            |             <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Member leave</p>             |
|        <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Streaming start</p>        |           <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Streaming stop</p>           |
|             <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Voice join</p>             |              <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Voice leave</p>              |
|           <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}.png"> <p>Voice change</p>           |          <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Username change</p>          |
|          <img src="https://raw.githubusercontent.com/{github_user_name}/{repo_name}/{branch}/.github/images/{aset_name}.{asset_extension}"> <p>Avatar change</p>          |                                                                                                                                                                        |

## Setup


> `npm i -s diff@^4.0.2` to install this widget's dependencies.

Open [config.json](/blob/master/config.json) to configure your own settings:

```js
{
  "clientMap": { "web": "🌐", "mobile": "📱", "desktop": "💻" },
  "colors": {
    "base": "7289da",
    "positive": "3498db",
    "neutral": "e67e22",
    "negative": "e91e63"
  },
  "deleteTimeThreshold": 1,
  "editTimeThreshold": 0,
  "guildChannelMap": {
    "GUILD_1_ID": {
      "logChannelId": "TEXT_CHANNEL_1_ID",
      "ignoreChannelIds": ["TEXT_CHANNEL_2_ID"]
    },
    "GUILD_2_ID": {
      "logChannelId": "TEXT_CHANNEL_3_ID",
      "ignoreChannelIds": ["TEXT_CHANNEL_4_ID"]
    },
    // ...Add as many guild-channel mappings as you want.
  }
}
```

- `clientMap` denotes the active clients the user is connected to. This displays in the log embed's footer.

- `colors` are used to color code log embeds by the action taken.

- Message edits or deletions that occur in less time than the `editTimeThreshold` or `deleteTimeThreshold` (in seconds), respectively, will not be logged.

- `logChannelId` is the channel the bot logs messages into.

- `ignoreChannelIds` tells the bot to not log messages from the listed channels (e.g. hidden admin-only channels, read-only information channels, etc).
