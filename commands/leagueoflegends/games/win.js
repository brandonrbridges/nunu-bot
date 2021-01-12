// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const CustomGame = require('../../../database/schema/customgame')
const User = require('../../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedError,
    embedSuccess
} = require('../../../functions/helpers')


module.exports = class WinCustomGameCommand extends Command {
    constructor() {
        super('wincustom', {
            aliases: ['wincustom'],
            args: [
                {
                    id: 'winningTeam',
                    type: 'number'
                }
            ]
        })
    }   

    async exec(message, { winningTeam }) {
        try {
            const game = await CustomGame.findOne({ guildId: message.guild.id, isActive: true })

            if(game) {
                if(game.inProgress) {
                    message.delete()
                    
                    let winners = []
                    
                    if(winningTeam === 1) {
                        game.teamOne.forEach(async discordId => {
                            await User.findOneAndUpdate({ discordId }, { $inc: { gold: 2500, blueEssence: 1000, gamesPlayed: 1, wins: 1 } }, { new: true })
                            const member = message.guild.members.cache.get(discordId)
                            winners.push(member)
                        })

                        game.teamTwo.forEach(async discordId => {
                            await User.findOneAndUpdate({ discordId }, { $inc: { gold: 500, blueEssence: 250 }, gamesPlayed: 1, losses: 1 }, { new: true })
                        })
                    } else {
                        game.teamTwo.forEach(async discordId => {
                            await User.findOneAndUpdate({ discordId }, { $inc: { gold: 2500, blueEssence: 1000, gamesPlayed: 1, wins: 1 } }, { new: true })
                            const user = message.guild.members.cache.get(discordId)
                            winners.push(user)
                        })

                        game.teamOne.forEach(async discordId => {
                            await User.findOneAndUpdate({ discordId }, { $inc: { gold: 500, blueEssence: 250 }, gamesPlayed: 1, losses: 1 }, { new: true })
                        })
                    }

                    await CustomGame.findOneAndUpdate({ guildId: message.guild.id, isActive: true }, { $set: { isActive: false, inProgress: false, winningTeam: winningTeam } }, { new: true })

                    const embed = embedSuccess(`🎉 Congratulations, Winners!\nFor participating, every player has received 500 Gold and 250 Blue Essence. The winner's additional rewards are listed below! GG!`).addFields({ name: 'Winners', value: winners, inline: true }, { name: 'Rewards', value: `2500 Gold\n1000 BE`, inline: true })
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, the custom game hasn't been started yet. You cannot assign a winning team until it has begun!`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, there was no active custom game found.`)
                return message.channel.send(embed)
            }
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}