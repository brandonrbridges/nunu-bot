const { Command } = require('discord-akairo')

const { fetchUser } = require('../../../functions/database')
const { calculateWinPercentage } = require('../../../functions/leagueoflegends')
const { getAvatarUrl } = require('../../../functions/helpers')

const { MessageEmbed } = require('discord.js')

module.exports = class ProfileCommand extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile'],
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
        fetchUser(args.user.id)
        .then(user => {
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${args.user}'s Server Custom Game Profile`,
                fields: [
                    {
                        name: 'Wins',
                        value: user.wins,
                        inline: true
                    },
                    {
                        name: 'Losses',
                        value: user.losses,
                        inline: true
                    },
                    {
                        name: 'Winrate',
                        value: 'Coming soon..',
                        inline: true
                    },
                ],
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            return message.channel.send(embed)
        })
        .catch(error => {

        })
    }
}