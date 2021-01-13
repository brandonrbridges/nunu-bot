/**
 * Schema
 */
const User = require('../database/schema/user')

/**
 * Helpers
 */
const { embedConsoleError, embedError, embedStandard, embedSuccess, getAvatarUrl } = require('./helpers')

/**
 * Discord.js
 */
const { MessageEmbed } = require('discord.js')

/**
 * Fetch Invite Count
 * 
 * @description Fetch invite count based on Discord ID
 * 
 * @argument message @type Object
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const fetchInviteCount = async (message, discordId) => {
    try {

    } catch(error) {
        
    }
    
    return new Promise((resolve, reject) => {
        const guild = message.guild

        const invites = guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === discordId))

        const uses = invites.uses

        if(uses) {
            return resolve(uses)
        } else {
            return resolve(0)
        }
    })
}

/**
 * Profile
 * 
 * @description Fetches a user profile
 * 
 * @version 1.0.0
 */
const profile = async (message, discordId) => {
    try {
        const user = await User.findOne({ discordId })
        const discordUser = message.guild.members.cache.get(discordId)

        if(user) {
            const embed = new MessageEmbed({
                color: '#ffa801',
                description: `${discordUser}'s Server Profile`,
                fields: [
                    {
                        name: 'Level',
                        value: user.level,
                        inline: true
                    },
                    {
                        name: 'Experience',
                        value: user.experience,
                        inline: true
                    },
                    {
                        name: 'Placeholder',
                        value: 'null',
                        inline: true
                    },
                    {
                        name: 'Gold',
                        value: user.gold,
                        inline: true
                    },
                    {
                        name: 'Blue Essence',
                        value: user.blueEssence,
                        inline: true
                    },
                    {
                        name: 'Orange Essence',
                        value: user.orangeEssence,
                        inline: true
                    },
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
                        value: Math.round((user.wins / (user.wins + user.losses) * 100) / 1) + '%',
                        inline: true
                    },
                ],
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            return message.channel.send(embed)
        } else {
            const embed = embedError('No user found in the database with that ID.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Exports
 */
module.exports = {
    fetchInviteCount,
    profile
}