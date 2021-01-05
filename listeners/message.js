const { Listener } = require('discord-akairo')

const { createUser } = require('../functions/database')

module.exports = class MessageListener extends Listener {
    constructor() {
        super('MessageListener', {
            emitter: 'client',
            event: 'message'
        })
    }

    exec(message) {
        /**
         * Ensure message is not from bot
         */
        if(message.author.bot) return

        /**
         * Create user in database if doesn't exist
         * 
         * @version 1.0.0
         */
        createUser(message.author.id)
    }
}