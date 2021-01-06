const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class InviteCreateListener extends Listener {
    constructor() {
        super('inviteCreate', {
            emitter: 'client',
            event: 'inviteCreate'
        })
    }

    exec(invite) {
        // Fetch log channel
        const logChannel = invite.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#0be881',
            description: `A new invite has been created!`,
            fields: [
                {
                    name: 'Created By',
                    value: invite.inviter,
                    inline: true
                },
                {
                    name: 'Invite',
                    value: `https://discord.gg/${invite.code}`,
                    inline: true
                },
                {
                    name: 'Invite Channel',
                    value: invite.channel,
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