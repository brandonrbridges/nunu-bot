const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class EmojiUpdateListener extends Listener {
    constructor() {
        super('emojiUpdate', {
            emitter: 'client',
            event: 'emojiUpdate'
        })
    }

    exec(oldEmoji, newEmoji) {
        // Fetch log channel
        const logChannel = newEmoji.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `An emoji has been modified!`,
            fields: [
                {
                    name: 'Emoji',
                    value: `<:${newEmoji.name}:${newEmoji.id}>`,
                    inline: true
                },
                {
                    name: 'Old Usage',
                    value: `:${oldEmoji.name}:`,
                    inline: true
                },
                {
                    name: 'New Usage',
                    value: `:${newEmoji.name}:`,
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