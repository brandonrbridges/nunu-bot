const { MessageEmbed } = require('discord.js')

/**
 * Check Permission
 * 
 * @description Checks message author's permissions based on argument
 * 
 * @argument message @type Object
 * @argument permission @type string
 * 
 * @version 1.0.0
 */
const checkPermissions = (message, permission) => {
    return new Promise((resolve, reject) => {
        // Set member constant
        const member = message.member

        // Check member permission
        if(member.hasPermission(permission)) {
            // Proceed if they have permission
            return resolve()
        } else {
            // If they don't have permission, create embed
            const embed = new MessageEmbed({
                color: '#f53b57',
                description: `${message.author}, you are not allowed to use this command!`,
                footer: {
                    iconURL: getAvatarUrl(client.user),
                    text: client.user.username
                }
            }).setTimestamp()

            // Send embed through rejection
            return reject(embed)
        }
    })
}

/**
 * Embed Error
 */
const embedError = (error) => {
    const embed = new MessageEmbed({
        color: '#f53b57',
        description: error,
        footer: {
            iconURL: getAvatarUrl(client.user),
            text: client.user.username
        }
    }).setTimestamp()

    return embed
}

/**
 * Embed Console Error
 */
const embedConsoleError = (error) => {
    const embed = new MessageEmbed({
        color: '#f53b57',
        description: `⚠️ There was an error with this action.`,
        fields: [
            {
                name: 'Console Error',
                value: error
            }
        ],
        footer: {
            iconURL: getAvatarUrl(client.user),
            text: client.user.username
        }
    }).setTimestamp()

    return embed
}

/**
 * Embed Standard
 */
const embedStandard = (description) => {
    const embed = new MessageEmbed({
        color: '#ffa801',
        description: description,
        footer: {
            iconURL: getAvatarUrl(client.user),
            text: client.user.username
        }
    }).setTimestamp()

    return embed
}

/**
 * Embed Success
 */
const embedSuccess = (description) => {
    const embed = new MessageEmbed({
        color: '#0be881',
        description: description,
        footer: {
            iconURL: getAvatarUrl(client.user),
            text: client.user.username
        }
    }).setTimestamp()

    return embed
}

/**
 * Format Number
 * 
 * @description Formats large numbers with commas
 * 
 * @argument number @type Number
 * 
 * @version 1.0.0
 */
const formatNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Get Avatar URL
 * 
 * @description Pieces together the url for a user's avatar
 * 
 * @argument user @type User
 * 
 * @version 1.0.0
 */
const getAvatarUrl = user => {
    return 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar
}

/**
 * Remove From Array
 * @description Finds string inside of array and removes it
 * 
 * @argument array @type Array
 * @argument string @type String
 * 
 * @version 1.0.0
 */
module.exports.removeFromArray = removeFromArray = (array, string) => {
    let word = array.indexOf(string)
    array.splice(word, 1)
    return array
  }

/**
 * Exports
 */
module.exports = {
    checkPermissions,
    embedConsoleError,
    embedSuccess,
    embedStandard,
    embedError,
    formatNumber,
    getAvatarUrl,
    removeFromArray
}