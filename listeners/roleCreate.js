const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class RoleCreateListener extends Listener {
    constructor() {
        super('roleCreate', {
            emitter: 'client',
            event: 'roleCreate'
        })
    }

    exec(role) {
        console.log(role)
        
        // Fetch log channel
        const logChannel = role.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `A new role has been created!`,
            fields: [
                {
                    name: 'Role',
                    value: role,
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