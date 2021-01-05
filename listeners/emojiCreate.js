const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class EmojiCreateListener extends Listener {
    constructor() {
        super('emojiCreate', {
            emitter: 'client',
            event: 'emojiCreate'
        })
    }

    exec(emoji) {
        // Fetch log channel
        const logChannel = emoji.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `A new emoji has been added!`,
            fields: [
                {
                    name: 'Emoji',
                    value: `<:${emoji.name}:${emoji.id}>`,
                    inline: true
                },
                {
                    name: 'Usage',
                    value: `:${emoji.id}:`,
                    inline: true
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