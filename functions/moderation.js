/**
 * Add Infraction
 * 
 * @description Adds an infraction
 * 
 * @argument discordId @type String
 * @argument reason @type String
 * @argument infractionType @type String
 */
const createInfraction = (discordId, reason, infractionType) => {
    
}

/**
 * Ban Member
 * 
 * @description Bans a member from the guild with a reason
 * 
 * @argument member @type GuildMember
 * @argument reason @type String
 * 
 * @version 1.0.0
 */
const banMember = (member, reason) => {
    
}

/**
 * Kick Member
 * 
 * @description Kicks a member from the guild with a reason
 * 
 * @argument member @type GuildMember
 * @argument reason @type String
 * 
 * @version 1.0.0
 */
const kickMember = (member, reason) => {
    
}

/**
 * Softban Member
 * 
 * @description Softbans a member from the guild with a reason
 * 
 * @argument member @type GuildMember
 * @argument reason @type String
 * 
 * @version 1.0.0
 */
const softbanMember = (member, reason) => {
    
}

/**
 * Warn Member
 * 
 * @description Warns a member from the guild with a reason
 * 
 * @argument member @type GuildMember
 * @argument reason @type String
 * 
 * @version 1.0.0
 */
const warnMember = (member, reason) => {
    
}

/**
 * Export
 */
module.exports = {
    createInfraction,
    banMember,
    kickMember,
    softbanMember,
    warnMember
}