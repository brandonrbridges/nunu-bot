const { Command } = require('discord-akairo')

const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class MembersCommand extends Command {
    constructor() {
        super('members', {
            aliases: ['members'],
        })
    }

    exec(message) {
        // Create embed
        const embed = new MessageEmbed({
            color: '#ffa801',
            description: `${message.guild.name} has ${message.guild.memberCount} members!`,
            footer: {
                iconURL: getAvatarUrl(client.user),
                text: client.user.username
            }
        }).setTimestamp()

        // Send embed
        return message.channel.send(embed)
    }
}