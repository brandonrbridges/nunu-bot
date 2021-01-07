const { Listener } = require('discord-akairo')

const { createUser } = require('../functions/database')

module.exports = class MessageListener extends Listener {
    constructor() {
        super('message', {
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
         * Make sure only the owner can use the bot
         */
        if(message.author.id === '471841188341743616') return

        /**
         * Create user in database if doesn't exist
         * 
         * @version 1.0.0
         */
        createUser(message.author.id)
    }
}