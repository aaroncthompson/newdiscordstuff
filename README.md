# ayurbot

A new iteration of a simple little bot to handle some slash commands we needed in my friend's Discord server, formerly hosted on AutoCode (RIP).

## event
Syntax: `/event`

Creates a form for you to type in the details of your event. Once you confirm that the event post looks good, it will post the modal, create a role, create a channel restricted to the invoker and that role, a post in a specified channel (`#rsvp` by default), and edit the preview with a confirmation and a command the invoker can copy/paste to call [Carl-bot](https://carl.gg/) to add a reaction role to the post, allowing users to opt in to private channels about upcoming events or topics by clicking the emoji Carl-bot reacts to the post with.

## eventmanage
Syntax: `/eventmanage`

Under construction.

# Known Issues
1. Implementation is.. bad. Each /event does not spawn a separate interaction but adds to a single one, with each interaction staying until timeout. This means if timeout is set to enough time for a user to have one event "stored" before clicking "Looks good!" on another, both events will be actioned. Current workaround is to set the timeout to something like 10 seconds which seems a reasonable amount of time for a user to review an event and click "Looks good!"..

2. I haven't yet tested with what happens when two different users use this at the same time - they'll probably bump into issue #1.
