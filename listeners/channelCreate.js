// const { Listener } = require('discord-akairo')

// const { getAvatarUrl } = require('../functions/helpers')

// const { MessageEmbed } = require('discord.js')

// module.exports = class ChannelCreateListener extends Listener {
//     constructor() {
//         super('channelCreate', {
//             emitter: 'client',
//             event: 'channelCreate'
//         })
//     }

//     exec(channel) {
//         // Fetch log channel
//         const logChannel = channel.guild.channels.cache.find(role => role.name === 'logs')

//         // If log channel not found, cancel command
//         if(!logChannel) return

//         // Create embed
//         const embed = new MessageEmbed({
//             color: '#0be881',
//             description: `A channel has been created!`,
//             fields: [
//                 {
//                     name: 'Channel',
//                     value: channel.name,
//                     inline: true
//                 },
//                 {
//                     name: 'Type',
//                     value: channel.type,
//                     inline: true
//                 }
//             ],
//             footer: {
//                 iconURL: getAvatarUrl(client.user),
//                 text: client.user.username
//             }
//         }).setTimestamp()

//         // Send embed
//         logChannel.send(embed)
//     }
// }