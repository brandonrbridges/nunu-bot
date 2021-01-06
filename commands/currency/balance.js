const { Command } = require('discord-akairo')

const { getUserBalance } = require('../../functions/currency')
const { formatNumber, getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class BalanceCommand extends Command {
    constructor() {
        super('balance', {
            aliases: ['balance', 'bal'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                    default: message => message.author
                }
            ]
        })
    }

    exec(message, args) {
        // Get user balance
        getUserBalance(args.user.id)
        .then(balance => {
            // Create embed
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${args.user} has ${formatNumber(balance)}`,
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