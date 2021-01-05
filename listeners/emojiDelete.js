const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class EmojiDeleteListener extends Listener {
    constructor() {
        super('emojiDelete', {
            emitter: 'client',
            event: 'emojiDelete'
        })
    }

    exec(emoji) {
        // Fetch log channel
        const logChannel = emoji.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#f53b57',
            description: `An emoji has been removed!`,
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