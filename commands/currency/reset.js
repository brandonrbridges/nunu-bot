const { Command } = require('discord-akairo')

const { resetDailies } = require('../../functions/currency')
const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class ResetCommand extends Command {
    constructor() {
        super('reset', {
            aliases: ['reset', 'resetdailies']
        })
    }

    exec(message) {
        // Reset dailies
        resetDailies()

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: 'Dailies have been successfully reset, everyone can use the command again!',
            footer: {
                iconURL: getAvatarUrl(client.user),
                text: client.user.username
            }
        }).setTimestamp()

        // Send embed
        return message.channel.send(embed)
    }
}