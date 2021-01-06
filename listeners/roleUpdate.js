const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class RoleUpdateListener extends Listener {
    constructor() {
        super('roleUpdate', {
            emitter: 'client',
            event: 'roleUpdate'
        })
    }

    exec(oldRole, newRole) {
        // Fetch log channel
        const logChannel = oldRole.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `A role has been updated/modified!`,
            fields: [
                {
                    name: 'Old Role',
                    value: oldRole,
                    inline: true
                },
                {
                    name: 'New Role',
                    value: newRole,
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