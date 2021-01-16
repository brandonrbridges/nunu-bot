// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedStandard,
} = require('../../functions/helpers')

module.exports = class LeaderboardCommand extends Command {
    constructor() {
        super('leaderboard', {
            aliases: ['leaderboard']
        })
    }

    async exec(message) {
        try {
            const users = await User.find({}, { sort: { level: -1, experience: -1 } })

            message.channel.send(users)
        
            const embed = embedStandard(`${message.guild.name}'s Leaderboard!`)

            let count = 1
            users.forEach(user => {
                message.channel.send(user)
                
                const member = message.guild.members.cache.get(user.discordId)
                embed.addField(`${count}. ${member}`, `Level ${user.level} (${user.lifetimeExperience} XP)`)
                count++
            })

            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}