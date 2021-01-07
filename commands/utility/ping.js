const { Command } = require('discord-akairo')

const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            ownerOnly: true
        })
    }

    exec(message) {
        // Create embed
        const embed = new MessageEmbed({
            description: 'Pong!',
            footer: {
                iconURL: getAvatarUrl(client.user),
                text: client.user.username
            }
        }).setTimestamp()

        // Send embed
        return message.channel.send(embed)
    }
}