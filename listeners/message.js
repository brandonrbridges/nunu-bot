const { Listener } = require('discord-akairo')

const { addExperience } = require('../functions/levelling')
const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        /**
         * Ensure message is not from bot
         */
        if(message.author.bot) return
        
        addExperience(message.author.id)

        if(message.channel.id === '471841188341743616') {
            if(message.content.startsWith('http://' || 'https://')) {
                message.delete()
                
                const embed = new MessageEmbed({
                    description: `${message.author} that message contained a link! Please post in the appropriate channel!`,
                    footer: {
                        iconURL: getAvatarUrl(client.user),
                        text: client.user.username
                    }
                }).setTimestamp()

                message.channel.send(embed)
            }
        }
    }
}