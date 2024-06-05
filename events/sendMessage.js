// sendMessage.js
 const sendMessage = (client) => (channelId, message) => {
     const channel = client.channels.cache.get(channelId);
     if (channel) {
	     channel.send(message);
     } else {
	     console.log('Channel not found.');
     }
 };

module.exports = sendMessage;
