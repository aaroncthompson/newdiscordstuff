# ayurbot

A port of a simple little bot to handle some slash commands we needed in my friend's Discord server, formerly hosted on AutoCode (RIP).

## event
Syntax: `/event eventname description (imageurl) (emoji) (channel)`

Creates a role, a private channel restricted to the invoker and that role, a post in a specified channel (`#rsvp` by default), and a confirmation message containing a command the invoker can copy/paste to call [Carl-bot](https://carl.gg/) to add a reaction role to the post, allowing users to opt in to private channels about upcoming events or topics by clicking the emoji Carl-bot reacts to the post with.

## eventremove
Syntax: `/eventremove message_id channel_name

Removes an event post created with `/event` using the `message_id` returned by the original `/event` response. Must be supplied the channel name.
