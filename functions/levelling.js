const User = require('../database/schema/user')

const { embedSuccess } = require('./helpers')

const { levels } = require('../database/levels')

/**
 * Adds experience
 * 
 * @description Adds user experience and sets database earning to false, until reset
 * 
 * @version 1.0.0
 */
const addExperience = async (discordId,content) => {
    try {
        const user = await User.findOne({ discordId })

        if(user && user.canEarnExperience) {
            const cappedXP = Math.floor(50 - 10** (-(content.length-860)/507.5)) //very delicate. even slight changes in values can be fatal lol

            await User.findOneAndUpdate({ discordId }, { $inc: { experience: cappedXp }, $set: { canEarnExperience: false } }, { new: true })
            
        } else { 
            return
        }
    } catch(error) {
        return console.error(error) 
    }
}

/**
 * Check XP
 * 
 * @description Checks user experience count 
 * 
 * @version 1.0.0
 */
const checkXp = async (discordId, guild, channel) => {
    try {
        const user = await User.findOne({ discordId })

        if(user) {
            if(user.experience >= levels[user.level + 1].xp) {
                levelUp(discordId, guild, channel)
            } else {
                return
            }
        } else {
            return
        }
    } catch(error) {
        return console.error
    }
}

/**
 * Level up
 * 
 * @description Increases user level
 * 
 * @version 1.0.0
 */
const levelUp = async (discordId, guild, channel) => {
    try {
        const user = await User.findOne({ discordId })
        const updatedUser = await User.findOneAndUpdate({ discordId }, { level: user.level + 1, experience: 0 }, { new: true })

        const member = guild.members.cache.get(discordId)

        if(levels[updatedUser.level].hasRole) {
            const role = guild.roles.cache.find(role => role.name === `Level ${updatedUser.level}`)
            member.roles.add(role)
        }

        const embed = embedSuccess(`🎉 ${member} has levelled up to Level ${updatedUser.level}`)
        return channel.send(embed)
    } catch(error) {
        return console.error
    }
}

/**
 * Reset Experience
 * 
 * @description Resets everyone's experience so that they can earn again
 * 
 * @version 1.0.0
 */
const resetExperienceGain = async () => {
    try {
        const users = await User.find({ canEarnExperience: false })

        users.forEach(async user => {
            await User.findOneAndUpdate({ discordId: user.discordId }, { canEarnExperience: true }, { new: true })
        })
    } catch(error) {
        return console.error(error)
    }
}

/**
 * Exports
 */
module.exports = {
    addExperience,
    checkXp,
    resetExperienceGain
}
