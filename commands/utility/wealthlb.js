// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const { 
    embedConsoleError,
    embedStandard,
    formatNumber,
} = require('../../functions/helpers')

module.exports = class WealthLeaderboardCommand extends Command {
    constructor() {
        super('wealthleaderboard', {
            aliases: ['wealthleaderboard', 'wealthlb']
        })
    }

    async exec(message) {
        try {
            const users = await User.find({}, {  }).sort({ bank: -1, gold: -1 })

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
                    embed.addField(`Rank ${i + 1} (Top Dog)`, `<:trophy1:801440737341734933> ${lbUsers[i]} - Gold: ${formatNumber(db.gold)} - Bank: ${formatNumber(db.bank)}`)
                } else if(i == 1) {
                    embed.addField(`Rank ${i + 1}`, `<:trophy2:801440737732198450> ${lbUsers[i]} - Gold: ${formatNumber(db.gold)} - Bank: ${formatNumber(db.bank)}`)
                } else if(i == 2) {
                    embed.addField(`Rank ${i + 1}`, `<:trophy3:801440737966817280> ${lbUsers[i]} - Gold: ${formatNumber(db.gold)} - Bank: ${formatNumber(db.bank)}`)
                } else {
                    embed.addField(`Rank ${i + 1}`, `${lbUsers[i]} - Gold: ${formatNumber(db.gold)} - Bank: ${formatNumber(db.bank)}`)
                }
            }

            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}