const User = require('../database/schema/user')

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
            user.currency = user.currency + amount
            
            // Save user and return user
            user.save().then(user => {
                return resolve(user.currency)
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
                if(user.currency >= amount && user.currency > 0) {
                    // Chance of winning
                    const chance = Math.random() < 0.42 

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
                return resolve(user.currency)
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
                .then(giverBalance => {
                    // Add amount to receiver
                    addToUserBalance(receiverId, amount)             
                    .then(receiverBalance => {
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
            user.currency = user.currency - amount
            
            // Save user and return user
            user.save().then(user => {
                return resolve(user.currency)
            })
        })
        .catch(error => {
            // Return error
            return reject(error)
        })
    })
}

/**
 * Exports
 */
module.exports = {
    bet,
    addToUserBalance,
    getUserBalance,
    giveBalance
}