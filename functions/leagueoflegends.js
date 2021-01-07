const CustomGame = require('../database/schema/customgame')

/**
 * Create Custom Game
 * 
 * @description Create a custom game for players to join
 * 
 * @argument discordId @type String
 * @argument gameId @type String
 * @argument maxPlayers @type Number
 * 
 * @version 1.0.0
 */
const createGame = (discordId, gameId, maxPlayers) => {
    return new Promise((resolve, reject) => {
        // Find game
        findGame(gameId)
        .then(game => {
            // If no game
            if(!game) {
                // Create and save game
                new CustomGame({
                    hostId: discordId,
                    gameId: gameId,
                    maxPlayers: maxPlayers
                })
                .save()
                .then(game => {
                    // Return game
                    return resolve(game)
                })
            } else {
                // Return error
                return reject('GAME_ALREADY_EXISTS')
            }
        })
        .catch(error => {
            // Error handling
            return reject(error)
        })
    })
}

/**
 * Find Custom Game
 * 
 * @description Find a custom game, if there is one ;)
 * 
 * @argument gameId @type String
 * 
 * @version 1.0.0
 */
const findGame = gameId => {
    return new Promise((resolve, reject) => {
        // Find Custom Game
        CustomGame.findOne({ gameId })
        .then(game => {
            // If there is a game
            if(game) {
                // Return game
                return resolve(game)
            } else {
                // Return null if no game found
                return reject(null)
            }
        })
    })
}

/**
 * Join Custom Game
 * 
 * @description If a custom game exists, join it
 * 
 * @argument gameId @type String
 * 
 * @version 1.0.0
 */
const joinGame = (gameId, playerId) => {
    return new Promise((resolve, reject) => {
        // Find Custom Game
        findGame({ gameId })
        .then(game => {
            // If player not in array
            if(!game.players.includes(playerId)) {
                // Add player ID to players array and save
                game.players.push(playerId).save().then(game => {
                    // Return game
                    return resolve(game)
                })
            } else {
                // Return error
                return reject('PLAYER_ALREADY_JOINED')
            }
        })
        .catch(error => {
            // Error handling
            return reject(error)
        })
    })
}

/**
 * Export
 */
module.exports = {
    createGame,
    findGame,
    joinGame
}