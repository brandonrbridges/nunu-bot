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
    formatNumber,
    getAvatarUrl
}