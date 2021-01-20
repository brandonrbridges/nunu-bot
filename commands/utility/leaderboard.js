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
            aliases: ['leaderboard', 'lb']
        })
    }

    async exec(message) {
        try {
            const users = await User.find({}, {  }).sort({ level: -1, experience: -1 })

            const lbUsers = []

            users.forEach(user => {
                const member = message.guild.members.cache.find(member => member.id === user.discordId)
                if(member) {
                    lbUsers.push(member)
                }
            })

            const embed = embedStandard(`🏆 ${message.guild.name}'s Leaderboard!`)

            for(let i = 0; i <= 9; i++) {
                const db = await User.findOne({ discordId: lbUsers[i].id })
                if(i == 0) {
                    embed.addField(`Rank ${i + 1} (Top Dog)`, `<:trophy1:801440737341734933> ${lbUsers[i]} - Level: ${db.level} - XP: ${db.experience}`)
                } else if(i == 1) {
                    embed.addField(`Rank ${i + 1}`, `<:trophy2:801440737732198450> ${lbUsers[i]} - Level: ${db.level} - XP: ${db.experience}`)
                } else if(i == 2) {
                    embed.addField(`Rank ${i + 1}`, `<:trophy3:801440737966817280> ${lbUsers[i]} - Level: ${db.level} - XP: ${db.experience}`)
                } else {
                    embed.addField(`Rank ${i + 1}`, `${lbUsers[i]} - Level: ${db.level} - XP: ${db.experience}`)
                }
            }

            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}