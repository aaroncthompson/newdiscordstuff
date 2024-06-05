const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, Events, PermissionFlagsBits } = require('discord.js');
const sendMessage = require('./sendMessage.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;

		if (interaction.customId === 'modalT') {
			await interaction.reply({ content: "Modal received", ephemeral: true})
		}

		const eventName = interaction.fields.getTextInputValue(`eventName`);
	        const eventDescription = interaction.fields.getTextInputValue(`eventDescription`);
	        const eventImage = interaction.fields.getTextInputValue(`eventImage`);
	        //const eventReact = interaction.fields.getTextInputValue(`eventReact`);

		// get requester's nickname
		const interactionUser = await interaction.guild.members.fetch(interaction.user.id)
		const nickName = interactionUser.nickname

		// get requester's picture
		const requesterAvatar = interactionUser.displayAvatarURL()

		const eventEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`${eventName}`)
			.setAuthor({ name: `${nickName}`, iconURL: `${requesterAvatar}` })
			.setThumbnail('https://i.imgur.com/pcB8ne7.jpeg')
                        //.addFields({ name: `Click ${eventReact} below if you're interested in attending!`, value: 'This will add you to the event discussion channel.', inline: false })
			.addFields({ name: `Click <:Josh:1049500355723005983> below if you're interested in attending!`, value: 'This will add you to the event discussion channel.', inline: false })
			.setTimestamp()
			.setFooter({ text: 'bottom text', iconURL: 'https://i.imgur.com/XzKH2Xk.png' });

		// optional fields
		if (eventDescription) {eventEmbed.setDescription(`${eventDescription}`)}
		if (eventImage) {eventEmbed.setImage(`${eventImage}`) }

		const confirmButton = new ButtonBuilder()
			.setCustomId('confirmButton')
			.setLabel('Looks good!')
			.setStyle(ButtonStyle.Success);
			//.setEmoji('105084477243419442');

		const saveButton = new ButtonBuilder()
                        .setCustomId('saveButton')
                        .setLabel('Save for later (WIP)')
			.setDisabled(true)
                        .setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder()
			.addComponents(confirmButton, saveButton);

		const response = await interaction.reply({
			content: "**This is a preview - please take a look and confirm if you'd like to post this to #rsvp.**",
			embeds: [eventEmbed],
			components: [row],
			ephemeral: true,
		});

		const filter = (interaction) => {
    			return interaction.isMessageComponent() && interaction.customId === 'confirmButton' || interaction.customId === 'saveButton';
		};

		const collector = interaction.channel.createMessageComponentCollector({
    			filter,
		    	time: 60000, // 60 seconds
		});

		collector.on('collect', async (interaction) => {
			if (interaction.customId === 'confirmButton') {
				// this'll be chunky, would be better to move all of this to another .js

				// create a role with a randomly generated name to use for this event
				const randomRoleName = Math.floor(Math.random() * 1000000)
				const theNewRole = await interaction.guild.roles.create({ name: `${randomRoleName}`, mentionable: "true", reason: `Creating new role for ${eventName}`, permissions: [] })
					.then(console.log)
					.catch(console.error);
				// for some reason just doing theNewRole.id isn't grabbing the role id
				const roleId = interaction.guild.roles.cache.find(role => role.name === `${randomRoleName}`);

				// create a private channel that only the event creator and the role can access
				const theChannel = await interaction.guild.channels.create({
					name: `${eventName}`,
					parent: "1050293996083232769",
					topic: `${eventDescription}`,
					type: ChannelType.GuildText,
					permissionOverwrites: [
						{
							id: interaction.guild.id,
							deny: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: interaction.user.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: roleId,
							allow: [PermissionFlagsBits.ViewChannel],
						},
					],
				})

				const channel = interaction.client.channels.cache.get('1047779404622856192')
				// channel.send({ embeds: [ eventEmbed ] })
				const theEventPost = await channel.send({ embeds: [ eventEmbed ] });
				//const reactionEmoji = theEventPost.guild.emojis.cache.find(emoji => emoji.name === `${eventReact}`);
				const reactionEmoji = interaction.client.emojis.cache.find(emoji => emoji.name === 'Josh');
				// the first react should be done by the actual react role bit
				//theEventPost.react(reactionEmoji)

        			await interaction.update({ content: `**Your event has been posted!**\nType \`&rr add 1047779404622856192 ${theEventPost.id} :Josh: ${randomRoleName}\`\nI swear I'm working on making it so you don't have to do this part :cry:`, components: [] });

    			} else if (interaction.customId === 'saveButton') {
        			await interaction.update({ content: '**NOT YET IMPLEMENTED**' });
    			}
		});

		collector.on('end', async (collected) => {
    			if (collected.size === 0) {
        			await interaction.editReply({ content: '**Confirmation not received within 1 minute - cancelling!**', components: [] });
    			}
		});

	}
}
