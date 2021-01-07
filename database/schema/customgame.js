const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    gameId: {
        required: true,
        type: String
    },
    hostId: {
        required: true,
        type: String
    },
    isActive: {
        default: true,
        type: Boolean
    },
    maxPlayers: {
        required: true,
        type: Number
    },
    playersJoined: {
        default: [],
        type: Array
    },
    teamOne: {
        default: [],
        type: Array
    },
    teamTwo: {
        default: [],
        type: Array
    },
    winningTeam: {
        type: String
    }
})

module.exports = mongoose.model('CustomGame', schema)