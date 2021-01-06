const { Command } = require('discord-akairo')

const { giveBalance } = require('../../functions/currency')
const { formatNumber, getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class GiveBalanceCommand extends Command {
    constructor() {
        super('givebalance', {
            aliases: ['givebalance', 'givebal', 'give'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'number'
                }
            ]
        })
    }

    exec(message, args) {
        // Get user balance
        giveBalance(message.author.id, args.user.id, args.amount)
        .then(() => {
            // Create embed
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${message.author} has given ${formatNumber(args.amount)} to ${args.user}!`,
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            // Send embed
            return message.channel.send(embed)
        })
    }
}