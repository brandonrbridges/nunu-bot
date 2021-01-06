const { Listener } = require('discord-akairo')

const { getAvatarUrl } = require('../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class InviteDeleteListener extends Listener {
    constructor() {
        super('inviteDelete', {
            emitter: 'client',
            event: 'inviteDelete'
        })
    }

    exec(invite) {
        // Fetch log channel
        const logChannel = invite.guild.channels.cache.find(role => role.name === 'logs')

        // If log channel not found, cancel command
        if(!logChannel) return

        // Create embed
        const embed = new MessageEmbed({
            color: '#f53b57',
            description: `An invite has been deleted!`,
            fields: [
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