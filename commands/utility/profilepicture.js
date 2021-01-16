// Akairo
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedStandard,
    getAvatarUrl
} = require('../../functions/helpers')

// Moment
const moment = require('moment')

module.exports = class ProfilePictureCommand extends Command {
    constructor() {
        super('profilepicture', {
            aliases: ['profilepicture', 'pfp'],
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        })
    }

    async exec(message, { member }) {
        try {
            const embed = embedStandard(`🔎 Enlarged profile picture of ${member}`)
                .setImage(getAvatarUrl(member.user))
            return message.channel.send(embed)
        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}