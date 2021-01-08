const User = require('../database/schema/user')

/**
 * Add Daily Amount
 * 
 * @description Add to user gold count
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const addDailyAmount = discordId => {
    // Find user by Discord ID
    User.findOne({ discordId })
    .then(user => {
        // Add amount
        user.gold = user.gold + 500
        
        // Save user
        user.save()
    })
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
const bet = (discordId, amount) => {
    return new Promise((resolve, reject) => {
        // Find user by Discord ID
        User.findOne({ discordId })
        .then(user => {
            // If user, continue
            if(user) {
                // Check if user balance is above zero and their bet amount 
                if(user.gold >= amount && user.gold > 0 && amount > 0) {
                    // Chance of winning
                    const chance = Math.random() <= 0.42

                    // If user wins
                    if(chance) {
                        // Calculate winnings
                        const winnings = amount * 1.42

                        // Add winnings to user balance
                        addToUserBalance(discordId, winnings)
                        .then(balance => {
                            // Return balance and winnings
                            return resolve(balance, winnings)
                        })
                        .catch(error => {
                            return reject('ERROR_ADDING_BALANCE')
                        })
                    } else {
                        // If user loses
                        removeFromUserBalance(discordId, amount)
                        .then(balance => {
                            // Return balance
                            return resolve(balance)
                        })
                        .catch(error => {
                            // Handle error 
                            return reject('ERROR_REMOVING_BALANCE')
                        })
                    }
                } else {
                    // If cannot afford, return error
                    return reject('INSUFFICIENT_FUNDS')
                }
            } else {
                // If not, return error
                return reject('INVALID_USER')
            }
        })
    })
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
const resetDailies = () => {
    // Find all users that have used daily
    User.find({ hasUsedDaily: true })
    .then(users => {
        // If there are users
        if(users) {
            // Loop through users
            users.forEach(user => {
                // Set daily to false
                user.hasUsedDaily = false

                // Save user
                user.save()
            })
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