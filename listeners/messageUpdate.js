const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MessageUpdateListener extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        })
    }

    exec(oldMessage, newMessage) {
        // If message originated from a bot, cancel command
        if(oldMessage.author.bot || newMessage.author.bot) return
        
        // Fetch log channel
        const logChannel = oldMessage.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `An message has been updated/modified!`,
            fields: [
                {
                    name: 'Author',
                    value: oldMessage.author,
                    inline: true
                },
                {
                    name: 'Channel',
                    value: oldMessage.channel,
                    inline: true
                },
                {
                    name: 'Old Content',
                    value: oldMessage.content,
                },
                {
                    name: 'New Content',
                    value: newMessage.content
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