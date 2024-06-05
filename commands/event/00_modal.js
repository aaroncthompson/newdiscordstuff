const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName("modal")
	.setDescription('MODAL DESCRIPTION'),
	async execute(interaction) {
                await interaction.reply({ content: 'Secret Pong!', ephemeral: true });
        },
	async execute(interaction) {
		const modalT = new ModalBuilder()
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
                modalT.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		interaction.showModal(modalT);
	}
}

// todo:
// * integrate reaction role

