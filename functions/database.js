const User = require('../database/schema/user')

/**
 * Create New User
 * 
 * @description Creates a new user in the database, after checking if they exists or not
 * 
 * @argument discordId @type String
 * 
 * @version 1.0.0
 */
const createUser = (discordId) => {
    return new Promise((resolve, reject) => {
        User.findOne({ discordId })
        .then(user => {
            if(user) {
                return null
            } else {
                new User({ 
                    discordId: discordId 
                })
                .save()
                .then(user => {
                    return resolve(user)
                })
                .catch(error => {
                    return reject(error)
                })
            }
        })
        .catch(error => {
            return reject(error)
        })
    })
}

/**
 * Fetch User
 * 
 * @description Fetches user from database using Discord ID
 * 
 * @argument discordId @type String
 */
const fetchUser = (discordId) => {
    return new Promise((resolve, reject) => {
        // Find user by Discord ID
        User.findOne({ discordId })
        .then(user => {
            // If user exists
            if(user) {
                // Return user
                return resolve(user)
            } else {
                // Handle error
                return reject('INVALID_USER')
            }
        })
        .catch(error => {
            return reject('INVALID')
        })
    })
}

/**
 * Exports
 */
module.exports = {
    createUser,
    fetchUser
}