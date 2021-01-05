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
    getAvatarUrl: getAvatarUrl
}