/**
 * Schema
 */
const User = require('../database/schema/user')

/**
 * Helpers
 */
const { embedConsoleError, embedError, embedStandard, embedSuccess, removeFromArray } = require('./helpers')


/**
 * Add Daily Amount
 * 
 * @description Add to user gold count
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const addDailyAmount = async (discordId) => {
    await User.findOneAndUpdate({ discordId }, { $inc: { gold: 500 } })
}

/**
 * Add To User Balance
 * 
 * @description Adds amount to user balance 
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 * 
 * @version 1.0.0
 */
const addToUserBalance = (discordId, amount) => {
    return new Promise((resolve, reject) => {
        User.findOne({ discordId })
        .then(user => {
            // Add to user balance
            user.gold = user.gold + amount
            
            // Save user and return user
            user.save().then(user => {
                return resolve(user)
            })
        })
        .catch(error => {
            // Return error
            return reject(error)
        })
    })
}

/**
 * Bet Amount
 * 
 * @description Bet amount and win a reward, or sorely use
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 * 
 * @version 1.0.0
 */
const bet = async (message, amount) => {
    try {
        const discordId = message.author.id
        const user = await User.findOne({ discordId })

        if(user) {
            if(amount > 0) {
                if(user.gold >= amount) {
                    let chance, winnings

                    if(amount <= 50) {
                        chance = Math.random() < 0.88
                        winnings = amount * 1.34
                    }

                    if(amount <= 100) {
                        chance = Math.random() < 0.77
                        winnings = amount * 1.40
                    }

                    if(amount <= 200) {
                        chance = Math.random() < 0.66
                        winnings = amount * 1.44
                    }

                    if(amount <= 500) {
                        chance = Math.random() < 0.55
                        winnings = amount * 1.48
                    }

                    if(amount <= 1000) {
                        chance = Math.random() < 0.44
                        winnings = amount * 1.52
                    }

                    if(amount <= 2000) {
                        chance = Math.random() < 0.33
                        winnings = amount * 1.56
                    }

                    if(amount >= 2001) {
                        chance = Math.random() < 0.26
                        winnings = amount * 1.88
                    }

                    winnings = Math.round(winnings)

                    if(chance) {
                        await User.findOneAndUpdate({ discordId }, { gold: user.gold + winnings}, { new: true })
                        
                        const embed = embedSuccess(`${message.author}, **you won ${winnings} Gold!** You now have ${user.gold} Gold.`)
                        return message.channel.send(embed)
                    } else {
                        await User.findOneAndUpdate({ discordId }, { gold: user.gold - amount }, { new: true })
                        
                        const embed = embedError(`${message.author}, **you lost ${amount} Gold!** Better luck next time.`)
                        return message.channel.send(embed)
                    }
                } else {
                    const embed = embedError(`${message.author}, you do not have enough Gold to bet this amount!\nYou currently have ${user.gold} Gold.`)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, you have to bet 1 Gold or more!`)
                return message.channel.send(embed)
            }
        } else {
            const embed = embedError(`There is no listing in the database for ${message.author}! Speak to V about this.`)
            return message.channel.send(embed)
        }
    } catch(error) {
        console.error(error)
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Check Daily Used
 * 
 * @description Check if user has used daily
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const hasUsedDaily = discordId => {
    return new Promise(resolve => {
        // Find user by Discord ID
        User.findOne({ discordId })
        .then(user => {
            // If user
            if(user) {
                // Send boolean
                if(!user.hasUsedDaily) {
                    // Return false
                    resolve(false)

                    // Set daily boolean to true and save
                    user.hasUsedDaily = true
                    return user.save()
                } else {
                    // Return true
                    return resolve(true)
                }
            }
        })
    })
}

/**
 * Get User Balance
 * 
 * @description Fetches user balance from the database
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const getUserBalance = (discordId) => {
    return new Promise((resolve, reject) => {
        // Find user by Discord ID
        User.findOne({ discordId })
        .then(user => {
            if(user) {
                // If user, return balance
                return resolve(user.gold)
            } else {
                // If no user, return error
                return reject('INVALID_USER')
            }
        })
        .catch(error => {
            // Return error
            return reject('MONGOOSE_ERROR')
        })
    })
}

/**
 * Give Balance
 * 
 * @description Transfers balance from the giver to the receiver
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 */
const giveBalance = (giverId, receiverId, amount) => {
    return new Promise((resolve, reject) => {
        // Fetch giver balance
        getUserBalance(giverId)
        .then(giverBalance => {
            // Check giver balance is above the amount and 0
            if(giverBalance >= amount && giverBalance > 0 && amount > 0) {
                // Remove amount from giver balance
                removeFromUserBalance(giverId, amount)
                .then(giver => {
                    // Add amount to receiver
                    addToUserBalance(receiverId, amount)             
                    .then(receiver => {
                        // Send success
                        return resolve()
                    })
                    .catch(error => {
                        // Handle error
                        return reject(error)
                    })
                })
                .catch(error => {
                    // Handle error
                    return reject(error)
                })
            } else {
                // Handle error
                return reject(error)
            }
        })
    })
}

/**
 * Remove From User Balance
 * 
 * @description Removes amount from user balance 
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 * 
 * @version 1.0.0
 */
const removeFromUserBalance = (discordId, amount) => {
    return new Promise((resolve, reject) => {
        User.findOne({ discordId })
        .then(user => {
            // Add to user balance
            user.gold = user.gold - amount
            
            // Save user and return user
            user.save().then(user => {
                return resolve(user.gold)
            })
        })
        .catch(error => {
            // Return error
            return reject(error)
        })
    })
}

/**
 * Reset Daily Usage
 * 
 * @description Resets every users daily boolean
 * 
 * @version 1.0.0
 */
const resetDailies = async () => {
    const users = await User.find({ hasUsedDaily: true })
    users.forEach(async user => {
        try {
            await User.findOneAndUpdate({ discordId: user.discordId }, { hasUsedDaily: false }, { new: true })
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    })
}

/**
 * Set Balance
 * 
 * @description Set user balance in database
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 * 
 * @version 1.0.0
 */
const setBalance = (discordId, amount) => {
    return new Promise((resolve, reject) => {
        // Find user by Discord ID
        User.findOne({ discordId })
        .then(user => {
            // If user exists
            if(user) {
                // Set amount
                user.gold = amount

                // Save user and return
                user.save().then(user => {
                    return resolve(user)
                })
            } else {
                // If not
                return reject('INVALID_USER')
            }
        })
    })
}

/**
 * Exports
 */
module.exports = {
    addDailyAmount,
    bet,
    addToUserBalance,
    hasUsedDaily,
    getUserBalance,
    giveBalance,
    resetDailies,
    setBalance
}