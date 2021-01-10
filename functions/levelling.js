const User = require('../database/schema/user')

/**
 * Adds experience
 * 
 * @description Adds user experience and sets database earning to false, until reset
 */
const addExperience = async (discordId) => {
    try {
        const user = await User.findOne({ discordId })

        if(user && user.canEarnExperience) {
            const randomXp = Math.floor(Math.random() * 30) + 10
            await User.findOneAndUpdate({ discordId }, { experience: user.experience + randomXp, canEarnExperience: false }, { new: true })
        } else {
            return
        }
    } catch(error) {
        return console.error(error) 
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
    resetExperienceGain
}