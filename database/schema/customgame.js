const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    guildId: {
        required: true,
        type: String
    },
    isActive: {
        default: true,
        type: Boolean
    },
    inProgress: {
        default: false,
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
        type: Number
    }
})

module.exports = mongoose.model('CustomGame', schema)