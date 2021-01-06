const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class RoleDeleteListener extends Listener {
    constructor() {
        super('roleDelete', {
            emitter: 'client',
            event: 'roleDelete'
        })
    }

    exec(role) {
        // Fetch log channel
        const logChannel = role.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#f53b57',
            description: `A role has been deleted!`,
            fields: [
                {
                    name: 'Role',
                    value: role.name,
                    inline: true
                },
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