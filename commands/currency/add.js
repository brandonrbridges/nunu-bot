const { Command } = require('discord-akairo')

const { addToUserBalance } = require('../../functions/currency')
const { formatNumber, getAvatarUrl } = require('../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class AddBalanceCommand extends Command {
    constructor() {
        super('addbalance', {
            aliases: ['addbalance', 'addbal'],
            args: [
                {
                    id: 'user',
                    type: 'user',
                },
                {
                    id: 'amount',
                    type: 'integer'
                }
            ],
            ownerOnly: true
        })
    }

    exec(message, args) {
        // Create user variable, depending on whether a user was mentioned
        const discordUser = (args.user ? args.user : message.author)
        
        // Update user balance function
        addToUserBalance(discordUser.id, args.amount)
        .then(user => {
            // Create embed
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${message.author} has increased ${discordUser}'s Gold! They now have ${formatNumber(user.gold)} Gold!`,
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            // Send embed
            return message.channel.send(embed)
        })
        .catch(error => {
            // Handle error
            console.error(error)
        })
    }
}