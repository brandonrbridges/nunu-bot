/**
 * Schema
 */
const CustomGame = require('../database/schema/customgame')

/**
 * Helpers
 */
const { embedConsoleError, embedError, embedStandard, embedSuccess, removeFromArray } = require('./helpers')

/**
 * Create Custom Game
 * 
 * @description Create a custom game for players to join
 * 
 * @version 1.0.0
 */
const createCustom = async (message) => {
    
}

/**
 * Delete Custom Game
 * 
 * @description Deletes custom game if one exists
 * 
 * @version 1.0.0
 */
const deleteCustom = async (message) => {
    
}

/**
 * Join Custom Game
 * 
 * @description Joins custom game if one exists
 * 
 * @version 1.0.0
 */
const joinCustom = async (message) => {
    
}

/**
 * Leave Custom Game
 * 
 * @description Leave custom game if one exists
 * 
 * @version 1.0.0
 */
const leaveCustom = async (message) => {
    
}

/**
 * Sort Custom Game
 * 
 * @description Sorts the teams on a custom game
 * 
 * @version 1.0.0
 */
const sortGame = async () => {
    try {
        const game = await CustomGame.findOne({ isActive: true })

        if(game) {
            game.players.forEach(discordId => {
                
            })
        } else {
            const embed = embedError('There was no active custom game found.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Win Custom Game
 * 
 * @description Sets the active custom game to win and grant rewards
 * 
 * @version 1.0.0
 */

/**
 * Export
 */
module.exports = {
    createCustom,
    deleteCustom,
    joinCustom,
    leaveCustom
}