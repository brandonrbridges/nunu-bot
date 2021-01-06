const { MessageEmbed } = require('discord.js')

/**
 * Check Permission
 * 
 * @description Checks message author's permissions based on argument
 * 
 * @argument message @type Object
 * @argument permission @type string
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
 * Format Number
 * 
 * @description Formats large numbers with commas
 * 
 * @argument number @type Number
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
 */
const getAvatarUrl = user => {
    return 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar
}

/**
 * Exports
 */
module.exports = {
    checkPermissions,
    formatNumber,
    getAvatarUrl,
}