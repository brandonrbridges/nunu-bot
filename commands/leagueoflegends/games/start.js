// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')

// Functions
const {
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess,
} = require('../../../functions/helpers')

module.exports = class StartCustomGameCommand extends Command {
    constructor() {
        super('startcustom', {
            aliases: ['startcustom']
        })
    }

    async exec(message) {
        try {
            let game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })
    
            if(game) {
                if(!game.inProgress) {
                    const players = game.players.sort(() => Math.random() - 0.5)
                    let teamOne = [], teamTwo = []

                    let count = 1
                    
                    players.forEach(discordId => {
                        if(count % 2 == 0) {
                            teamOne.push(discordId)
                        } else {
                            teamTwo.push(discordId)
                        }

                        count++
                    })

                    game = await CustomGame.findOneAndUpdate({ isActive: true }, { $set: { inProgress: true, teamOne, teamTwo } }, { new: true})

                    teamOne = [], teamTwo = []

                    game.teamOne.forEach(discordId => {
                        const member = message.guild.members.cache.get(discordId)
                        teamOne.push(member)
                    })

                    game.teamTwo.forEach(discordId => {
                        const member = message.guild.members.cache.get(discordId)
                        teamTwo.push(member)
                    })

                    const embed = embedSuccess(`🕹️ Let the games begin!`).addFields({ name: 'Team One', value: teamOne, inline: true }, { name: 'Team Two', value: teamTwo, inline: true })
                    return message.channel.send(embed)
                } else {
                    let teamOne = [], teamTwo = []

                    game.teamOne.forEach(discordId => {
                        const member = message.guild.members.cache.get(discordId)
                        teamOne.push(member)
                    })

                    game.teamTwo.forEach(discordId => {
                        const member = message.guild.members.cache.get(discordId)
                        teamTwo.push(member)
                    })
                    
                    const embed = embedStandard(`🕹️ The custom game has already started!`).addFields({ name: 'Team One', value: teamOne, inline: true }, { name: 'Team Two', value: teamTwo, inline: true })
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