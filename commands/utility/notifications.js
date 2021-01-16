const { Command } = require('discord-akairo')

const { getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class NotificationsCommand extends Command {
    constructor() {
        super('notifications', {
            aliases: ['notifications'],
            args: [
                {
                    id: 'type',
                    type: 'string',
                    default: 'list'
                }
            ]
        })
    }

    exec(message, args) {

        // Check type argument
        if(args.type === 'list') {
            // Create embed
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: 'The Notifications command will grant you a role in which you wish to be notified for something. E.g. Custom Games',
                fields: [
                    {
                        name: `${prefix}notifications games`,
                        value: 'Receive a notification when Custom Games are being hosted'
                    }
                ],
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            // Send embed
            return message.channel.send(embed)
        }

        // Check type argument
        if(args.type === 'games') {
            // Find appropriate role
            const role = message.guild.roles.cache.find(role => role.name === 'Custom Games')
            
            // Add role to member
            message.member.roles.add(role)
            .then(x => {
                console.log(x)
            })
            .catch(error => {
                console.error(error)
            })

            // Create embed
            const embed = new MessageEmbed({
                color: '#0be881',
                description: `${message.author}, you now have the ${role} role!\nYou will now be notified when a new Custom Game is being started.`,
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            // Send embed
            return message.channel.send(embed)
        }
    }
}