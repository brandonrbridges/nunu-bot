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
    try {
        const existingGame = await CustomGame.findOne({ isActive: true })

        if(!existingGame) {
            await new CustomGame().save()

            const embed = embedSuccess(`A custom game has been created!`)
            return message.channel.send(embed)
        } else {
            const embed = embedError('An active custom game already exists.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Delete Custom Game
 * 
 * @description Deletes custom game if one exists
 * 
 * @version 1.0.0
 */
const deleteCustom = async (message) => {
    try {
        const game = await CustomGame.findOne({ isActive: true })

        if(game) {
            await game.delete()

            const embed = embedSuccess('The active custom game has been deleted!')
            return message.channel.send(embed)
        } else {
            const embed = embedError('There was no active custom game found to delete.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Join Custom Game
 * 
 * @description Joins custom game if one exists
 * 
 * @version 1.0.0
 */
const joinCustom = async (message) => {
    try {
        const game = await CustomGame.findOne({ isActive: true })
        const discordId = message.author.id

        if(game) {
            if(!game.players.includes(discordId)) {
                if(game.players <= game.maxPlayers) {
                    try {
                        await game.players.push(discordId)
                        await game.save()

                        const embed = embedSuccess(`${message.author}, you have joined the custom game!`)
                        return message.channel.send(embed)
                    } catch(error) {
                        const embed = embedConsoleError(error)
                        return message.channel.send(embed)
                    }
                } else {
                    const embed = embedError(`${message.author}, the game appears to already be full! There are ${game.maxPlayers} players in the custom game.`)
                    return message.channel.send(embed)    
                }
            } else {
                const embed = embedError(`${message.author}, you are already participating in the custom game.`)
                return message.channel.send(embed)
            }
        } else {
            const embed = embedError('There are no active custom games at the moment.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}

/**
 * Leave Custom Game
 * 
 * @description Leave custom game if one exists
 * 
 * @version 1.0.0
 */
const leaveCustom = async (message) => {
    try {
        const game = await CustomGame.findOne({ isActive: true }) 

        if(game) {
            if(game.players.includes(message.author.id)) {
                try {
                    game.players = await removeFromArray(game.players, message.author.id)
                    await game.save()
    
                    const embed = embedSuccess('You have left the custom game!')
                    return message.channel.send(embed)
                } catch(error) {
                    const embed = embedConsoleError(error)
                    return message.channel.send(embed)
                }
            } else {
                const embed = embedError(`${message.author}, you are currently not listed in the custom game.`)
                return message.channel.send(embed)
            }
        } else {
            const embed = embedError('There are no active custom games at the moment.')
            return message.channel.send(embed)
        }
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
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