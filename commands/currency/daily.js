const { Command } = require('discord-akairo')

const { addDailyAmount, hasUsedDaily } = require('../../functions/currency')
const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class DailyCommand extends Command {
    constructor() {
        super('daily', {
            aliases: ['daily']
        })
    }

    exec(message) {
        // Check daily
        hasUsedDaily(message.author.id)
        .then(used => {
            // If not used
            if(!used) {
                // Add daily amount
                addDailyAmount(message.author.id)
                
                // Create embed
                const embed = new MessageEmbed({
                    color: '#0be881',
                    description: `${message.author}, 500 Gold has been added to your balance!`,
                    footer: {
                        iconURL: getAvatarUrl(client.user),
                        text: client.user.username
                    }
                }).setTimestamp()

                // Send embed
                return message.channel.send(embed)
            } else {
                // Create embed
                const embed = new MessageEmbed({
                    color: '#f53b57',
                    description: `${message.author}, you have already used daily today!`,
                    footer: {
                        iconURL: getAvatarUrl(client.user),
                        text: client.user.username
                    }
                }).setTimestamp()

                // Send embed
                return message.channel.send(embed)
            }
        })
    }
}