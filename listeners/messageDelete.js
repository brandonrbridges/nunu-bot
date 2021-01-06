const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MessageDeleteListener extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        })
    }

    exec(message) {
        // Fetch log channel
        const logChannel = message.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#f53b57',
            description: `An message has been deleted!`,
            fields: [
                {
                    name: 'Author',
                    value: message.author,
                    inline: true
                },
                {
                    name: 'Channel',
                    value: message.channel,
                    inline: true
                },
                {
                    name: 'Content',
                    value: message.content,
                }
            ],
            footer: {
                iconURL: getAvatarUrl(client.user),
                text: client.user.username
            }
        }).setTimestamp()

        // Send embed
        logChannel.send(embed)
    }
}