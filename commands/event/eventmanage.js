const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eventmanage')
		.setDescription('NOT READY! Opens a window showing your recent event posts and allows you to delete them.'),
	async execute(interaction) {
		await interaction.reply('eventmanage is not ready yet, sorry.');
	},
};

// note that the command only accounts for active events (eg event channel under 1050293996083232769)

/*

1. identify active event posts
* check parent 1050293996083232769 for channels in which the user specifically has read on (rather than having access to by virtue of role etc) - is this possible? if not.. 
* grab channel names from 1050293996083232769, cross-reference #rsvp for those events' authors, return those where invoker=

2. modal? unsure how to build this ui - undefined number of entries each with two options.. maybe one active, buttons to toggle between? lol

3a. delete: (disable react role?), deletes the rsvp message, removes all read perms on channel, alert admins to delete

3b. archive: disable react role, edits the rsvp message, moves channel to archived and disables further sends

// note that josh or aaron can undo archive but 'probably' not delete

*/
