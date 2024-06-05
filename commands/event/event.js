const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName("event")
	.setDescription('Launches a little form to build your event. Report any issues to Aaron!'),

	// this is probably unnecessary now
	async execute(interaction) {
                await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
        },

	async execute(interaction) {
		const modal = new ModalBuilder()
			.setTitle('Create an event')
			.setCustomId(`eventModal`)

		const eventName = new TextInputBuilder()
			.setCustomId('eventName')
			.setRequired(true)
			.setLabel('What do you want to name the event?')
			.setStyle(TextInputStyle.Short)
			.setMaxLength(256)

                const eventDescription = new TextInputBuilder()
                	.setCustomId('eventDescription')
                	.setRequired(false)
                	.setLabel('Optional: Give a description for the event.')
                	.setStyle(TextInputStyle.Paragraph)
			.setMaxLength(1_024)

		const eventImage = new TextInputBuilder()
	                .setCustomId('eventImage')
	                .setLabel('Optional: Choose an image for the post.')
	                .setStyle(TextInputStyle.Short)
	                .setRequired(false)

		// low priority for implementation - i recall there were problems w/r/t parsing custom vs normal reacts?
		/*
		const eventReact = new TextInputBuilder()
	                .setCustomId('eventReact')
	                .setLabel('Choose a custom react, or use the default.')
	                .setStyle(TextInputStyle.Short)
			.setValue(`:white_check_mark:`)
			.setRequired(true)
		*/

		const firstActionRow = new ActionRowBuilder().addComponents(eventName);
		const secondActionRow = new ActionRowBuilder().addComponents(eventDescription);
		const thirdActionRow = new ActionRowBuilder().addComponents(eventImage);
                //const fourthActionRow = new ActionRowBuilder().addComponents(eventReact);

		//modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		interaction.showModal(modal);
	}
}

// todo:
// * integrate reaction role

