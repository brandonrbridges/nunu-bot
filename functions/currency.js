const User = require('../database/schema/user')

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
 * Update User Balance
 * 
 * @description Updates user balance by variable amount
 * 
 * @argument discordId @type String
 * @argument amount @type Number
 * 
 * @version 1.0.0
 */
const updateUserBalance = (discordId, amount) => {
    return new Promise((resolve, reject) => {
        User.findOne({ discordId })
        .then(user => {
            // Adds to the user's balance
            user.currency = user.currency + amount
            
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
 * Exports
 */
module.exports = {
    getUserBalance,
    updateUserBalance
}