require('dotenv').config()

const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo')

const mongoose = require('mongoose')

const cron = require('node-cron')

const { resetDailies } = require('./functions/currency')
const { resetExperienceGain } = require('./functions/levelling')
const { embedStandard } = require('./functions/helpers')

const CustomGame = require('./database/schema/customgame')

prefix = '!'

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
         * Command Handlers
         */

        this.commands = new CommandHandler(this, {
            directory: './commands/',
            prefix: prefix
        }).loadAll()

        /**
         * Listener Handler
         */
        this.listeners = new ListenerHandler(this, {
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
 * Cron Job 
 * 
 * @description Runs at midnight to see if the user has used the daily command
 */
cron.schedule('0 0 * * *', () => {
    // Reset user daily usage
    resetDailies()
})

/**
 * Cron Job
 * 
 * @description Runs every minute to check if the user has sent a message and gained XP
 */
cron.schedule('* * * * *', () => {
    // Resets the ability to gain XP to true
    resetExperienceGain()
})

/**
 * Cron Job
 * 
 * @description Runs at 7pm everyday and creates a server wide custom game
 */
cron.schedule('55 18 * * *', () => {

    const guild = client.guilds.cache.get('788731111845003294')
    const channel = guild.channels.cache.find(channel => channel.name == 'general')
    const role = guild.roles.cache.find(role => role.name == 'Custom Games')

    const embed = embedStandard(` 🕹️ Players be ready! Our Custom Games are starting in 5 minutes!`)

    channel.send(role)
    return channel.send(embed)
})

cron.schedule('00 19 * * *', () => {

    const guild = client.guilds.cache.get('788731111845003294')
    const channel = guild.channels.cache.find(channel => channel.name == 'general')
    const role = guild.roles.cache.find(role => role.name == 'Custom Games')

    const embed = embedStandard(`🕹️ Let the Custom Games begin! Let's go!`)

    channel.send(role)
    return channel.send(embed)
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