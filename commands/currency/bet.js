const { Command } = require('discord-akairo')

const { bet } = require('../../functions/currency')
const { formatNumber, getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class BetCommand extends Command {
    constructor() {
        super('bet', {
            aliases: ['bet'],
            args: [
                {
                    id: 'amount',
                    type: 'number',
                }
            ]
        })
    }

    exec(message, args) {
        // Get user balance
        bet(message.author.id, args.amount)
        .then((balance, winnings) => {
            // Create embed
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${args.user} has won ${formatNumber(winnings)}! They now have ${balance}.`,
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