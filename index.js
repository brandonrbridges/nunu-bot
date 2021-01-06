require('dotenv').config()

const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

const mongoose = require('mongoose')

const prefix = ','

class Client extends AkairoClient {
    constructor() {
        super({
            // Akairo Settings
            ownerID: ['471841188341743616'],
        }, {
            // Discord.js Settings
            disableMentions: 'everyone'
        })

        /**
         * // ================================================================================== //
         * Command Handlers
         * // ================================================================================== //
         */

        /**
         * Moderation Commands
         * 
         * @version 1.0.0
         */
        this.moderationCommands = new CommandHandler(this, {
            directory: './commands/moderation/',
            prefix: prefix
        }).loadAll()

        /**
         * Utility Commands
         * 
         * @version 1.0.0
         */
        this.utilityCommands = new CommandHandler(this, {
            directory: './commands/utility/',
            prefix: prefix
        }).loadAll()

        /**
         * Currency Commands
         * 
         * @version 1.0.0
         */
        this.currencyCommands = new CommandHandler(this, {
            directory: './commands/currency/',
            prefix: prefix
        }).loadAll()

        /**
         * Fun Commands
         * 
         * @version 1.0.0
         */
        this.funCommands = new CommandHandler(this, {
            directory: './commands/fun/',
            prefix: prefix
        }).loadAll()

        /**
         * League of Legends Commands
         * 
         * @version 1.0.0
         */
        this.leagueoflegendsCommands = new CommandHandler(this, {
            directory: './commands/leagueoflegends/',
            prefix: prefix
        }).loadAll()

        /**
         * League of Legends Game Commands
         * 
         * @version 1.0.0
         */
        this.leagueoflegendsgamesCommands = new CommandHandler(this, {
            directory: './commands/leagueoflegends/games',
            prefix: prefix
        }).loadAll()

        /**
         * // ================================================================================== //
         * Listener Handler
         * // ================================================================================== //
         */
        this.eventListeners = new ListenerHandler(this, {
            directory: './listeners/'
        }).loadAll()
    }   
}

client = new Client()

/**
 * DATABASE CONNECTION
 * 
 * @version 1.0.0
 */
mongoose.connect(process.env.DATABASE, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('== DATABASE CONNECTED ==')
})
.catch(error => {
    console.error('== ! UNABLE TO CONNECT TO DATABASE ! ==')
    console.error(error)
})

/**
 * Discord Bot Login
 * 
 * @version 1.0.0
 */
client.login(process.env.TOKEN)
.then(() => {
    console.log(`== ${client.user.username.toUpperCase()} IS SIGNED IN ==`)
})
.catch(error => {
    console.log('== ! UNABLE TO CONNECT TO DISCORD ! ==')
    console.error(error)
})