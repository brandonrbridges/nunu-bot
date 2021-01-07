const { Command } = require('discord-akairo')

const { getAvatarUrl } = require('../../functions/helpers')
const { fetchInviteCount } = require('../../functions/utility')

const { MessageEmbed } = require('discord.js')

module.exports = class InvitesCommand extends Command {
    constructor() {
        super('invites', {
            aliases: ['invites'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        })
    }

    exec(message, args) {
        fetchInviteCount(message, args.member)
        .then(uses => {
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${args.member} has invited ${uses} members to the server!`,
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            return message.channel.send(embed)
        })
    }
}