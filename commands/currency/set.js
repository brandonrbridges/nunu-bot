const { Command } = require('discord-akairo')

const { setBalance } = require('../../functions/currency')
const { checkPermissions, formatNumber, getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class SetBalanceCommand extends Command {
    constructor() {
        super('setbalance', {
            aliases: ['setbalance', 'setbal', 'set'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'number'
                }
            ],
        })
    }

    exec(message, args) {
        // Check balance
        checkPermissions(message, 'ADMINISTRATOR')
        .then(() => {
            // Set user balance
            setBalance(args.user.id, args.amount)
            .then(() => {
                // Create embed
                const embed = new MessageEmbed({
                    color: '#0be881',
                    description: `${message.author} has set ${args.user}'s balance to ${formatNumber(args.amount)}!`,
                    footer: {
                        iconURL: getAvatarUrl(client.user),
                        text: client.user.username
                    }
                }).setTimestamp()

                // Send embed
                return message.channel.send(embed)
            })
        })
        .catch(embed => {
            return message.channel.send(embed)
        })
    }
}