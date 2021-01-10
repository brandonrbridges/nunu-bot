const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    isActive: {
        default: true,
        type: Boolean
    },
    maxPlayers: {
        default: 10,
        required: true,
        type: Number
    },
    players: {
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