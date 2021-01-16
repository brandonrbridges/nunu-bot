// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')

// Functions
const {
    embedConsoleError,
    embedError,
    embedStandard,
} = require('../../../functions/helpers')

module.exports = class PlayersCustomGameCommand extends Command {
    constructor() {
        super('playerscustom', {
            aliases: ['playerscustom']
        })
    }

    async exec(message) {
        try {
            let game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
    
            if(game) {
                let players = []

                game.players.forEach(discordId => {
                    const member = message.guild.members.cache.get(discordId)
                    players.push(member)
                })

                if(players >= 1) {
                    const embed = embedStandard(`🕹️ There are currently ${game.players.length} queued for the custom game.`).addFields({ name: 'Players', value: players })
                    return message.channel.send(embed)
                } else {
                    const embed = embedStandard(`🕹️ There are currently no players in the custom game. Use ${prefix}joincustom to join.`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, there are no active custom games at the moment.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            console.error(error)
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}