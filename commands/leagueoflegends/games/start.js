// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')

// Functions
const {
    checkRole,
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess,
    removeFromArray
} = require('../../../functions/helpers')

module.exports = class StartCustomGameCommand extends Command {
    constructor() {
        super('startcustom', {
            aliases: ['startcustom']
        })
    }

    async exec(message) {
        try {
            const permission = await checkRole(message, 'Staff')

            console.log(permission)

            if(permission) {
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

                        game = await CustomGame.findOneAndUpdate({ isActive: true }, { $set: { inProgress: true, teamOne, teamTwo } }, { new: true })

                        teamOne = [], teamTwo = []

                        let positions = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']

                        game.teamOne.forEach(discordId => {
                            let pos = positions[Math.floor(Math.random() * positions.length)]
                            let emoji = message.guild.emojis.cache.find(emoji => emoji.name == `position_${pos.toLowerCase()}`)

                            const member = message.guild.members.cache.get(discordId)
                            teamOne.push(`${emoji} ${member}`)

                            positions = removeFromArray(positions, pos)
                        })

                        positions = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']

                        game.teamTwo.forEach(discordId => {
                            let pos = positions[Math.floor(Math.random() * positions.length)]
                            let emoji = message.guild.emojis.cache.find(emoji => emoji.name == `position_${pos.toLowerCase()}`)

                            const member = message.guild.members.cache.get(discordId)
                            teamTwo.push(`${emoji} ${member}`)

                            positions = removeFromArray(positions, pos)
                        })

                        const embed = embedSuccess(`🕹️ Let the games begin! Your randomised teams and lanes are below!`).addFields({ name: 'Team One', value: teamOne, inline: true }, { name: 'Team Two', value: teamTwo, inline: true })
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
            }
        } catch(error) {
            console.error(error)
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}