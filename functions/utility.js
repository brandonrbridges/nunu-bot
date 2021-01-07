/**
 * Fetch Invite Count
 * 
 * @description Fetch invite count based on Discord ID
 * 
 * @argument message @type Object
 * @argument discordId @type String
 */
const fetchInviteCount = (message, discordId) => {
    return new Promise((resolve, reject) => {
        // Fetch guild
        const guild = message.guild

        // Fetch invites based on Discord ID
        const invites = guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === discordId))

        // Calculate uses
        const uses = invites.uses

        // If use count
        if(uses) {
            // Return use count
            return resolve(uses)
        } else {
            // If no uses, return 0
            return resolve(0)
        }
    })
}

/**
 * Exports
 */
module.exports = {
    fetchInviteCount
}