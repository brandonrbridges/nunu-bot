// Akairo
const { Command } = require('discord-akairo')

// Functions
const {
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess
} = require('../../functions/helpers')

module.exports = class AddEmoji extends Command {
    constructor() {
        super('addemoji', {
            aliases: ['addemoji'],
            args: [
                {
                    id: 'emoji',
                    type: 'string',
                    prompt: {
                        start: message => {
                            const embed = embedStandard(`${message.author}, please paste the image URL now.`)
                            return { embed }
                        }
                    }
                },
                {
                    id: 'name',
                    type: 'string',
                    prompt: {
                        start: message => {
                            const embed = embedStandard(`${message.author}, what would you like to type in to use this emoji? Example: nunu_uwu`)
                        }
                    }
                }
            ]
        })
    }

    exec(message, { emoji, name }) {
        console.log(emoji)
        console.log(name)
    }
}