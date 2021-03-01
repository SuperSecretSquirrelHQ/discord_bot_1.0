# Discord Starboard Bot

[![Discord](https://discordapp.com/api/guilds/(GUILD_ID)/embed.png)](https://discord.gg/(INVITE_CODE)) 

A Discord bot that allows for the democratic pinning of messages.

## Setup

- Open [config.json](blob/master/config.json) to configure your own settings:

```js
[
  {
    "guildId": "GUILD_ID",
    "channelId": "CHANNEL_1_ID",
    "reactionThreshold": 3,
    "votePolicy": "public",
    "upvote": {
      "emojis": ["⭐", "⬆️"],
      "overrideEmojis": ["🌟"],
      "overrideUserIds": ["USER_1_ID", "USER_2_ID"],
      "overrideRoleIds": ["ROLE_1_ID"]
    },
    "downvote": {
      "emojis": ["⬇️"],
      "overrideEmojis": ["⛔"],
      "overrideUserIds": ["USER_1_ID"],
      "overrideRoleIds": []
    },
    "pinnedIndicator": {
      "message": "{1}'s message was pinned to {2}.",
      "pingUser": true
    },
    "embed": {
      "color": "ffac33",
      "footerText": "Starboard",
      "jumpText": "link",
      "renderJumpLink": true
    },
    "ignore": {
      "rules": true,
      "nsfw": false,
      "self": true,
      "botMessage": false,
      "channelIds": ["CHANNEL_2_ID"]
    }
  },
  // ...Add as many rules as you want.
]
```

> You can have multiple starboards in one server! Simply add more rule objects inside the `config.json` file. The only requirement is that **all** the `emojis` between each rule **must** be unique.

- `guildId` is the server you wish to enable starboard for.
- `channelId` is the text channel you wish to be the starboard.
- `reactionThreshold` is the number of reactions needed before the message gets pinned.
- `votePolicy` **must** be one of the following strings:

  - `public`: Reaction count is allowed to accumulate without bot interference. Anyone can see the total reaction counts.
  - `private`: Bot removes all user reactions and replaces it with its own. Vote count is not visible but the bot's reaction lets users know that _someone_ has reacted.
  - `hidden`: Bot removes all user reactions. Vote count is not visible at all.

- `upvote`/`downvote`

  - `emojis` are the reaction emojis the bot tracks. The message gets pinned when the count difference between upvotes and downvotes is greater than or equal to the `reactionThreshold`.

    - An emoji can be:

      - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

        ```js
        "😳", "🥺", // etc
        ```

      - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

        ```js
        "716344914706694165", "622635442013208589", // etc
        ```

  - `overrideEmojis` are the reaction emojis that automatically pins the message (`upvote`) or prevents the pinning of the message (`downvote`) no matter what the count was at.
  - `overrideUserIds` are the users who can use `overrideEmojis`.
  - `overrideRoleIds` are the roles whose assigned users can use `overrideEmojis`.

  > Leave `downvote`'s array options empty `[]` if you wish to not use the downvote logic.

- `pinnedIndicator`

  - `message` is the string the bot sends post-pin in the channel where the original message is.
    - Use `{1}` to mention the user whose message was pinned and use `{2}` to mention the starboard channel (it uses `channelId`).
    - If blank, a post-pin message will not be sent.
  - `pingUser` determines whether `message` pings the user (`true`) or not (`false`).
    - The bot makes a quick message edit to mention the user, thus avoiding the ping.

- `embed`

  - `color` is the color of the embed.
  - `footerText` is the text rendered at the footer of the embed.
  - `jumpText` is the hyperlink text rendered to jump to the message.
  - `renderJumpLink` determines whether the hyperlink text renders (`true`) or not (`false`).

- `ignore`

  - `rules` determines whether override users can ignore all the rules listed below (`true`) or not (`false`).
  - `nsfw` determines whether the bot ignores NSFW channels (`true`) or not (`false`).
  - `self` determines whether the bot ignores reactions made by the message's author (`true`) or not (`false`).
  - `botMessage` determines whether the bot ignores bot messages (`true`) or not (`false`).
  - `channelIds` are the text channels the bot ignores.