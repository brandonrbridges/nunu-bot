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
const createUser = async (discordId) => {
    const existingUser = await User.findOne({ discordId })

    if(!existingUser) await new User({ discordId }).save()
}

/**
 * Exports
 */
module.exports = {
    createUser
}