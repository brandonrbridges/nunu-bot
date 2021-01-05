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
 * Exports
 */
module.exports = {
    createUser: createUser
}