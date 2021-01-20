// Akario
const { Command } = require('discord-akairo')

// Mongoose
const User = require('../../database/schema/user')

// Functions
const {
    embedConsoleError,
    embedError,
    getAvatarUrl
} = require('../../functions/helpers')

// Levels
const { levels } = require('../../database/levels')

// Image Manipulations
// const { Canvas } = require('canvas-constructor')
const downloader = require('image-downloader')
const jimp = require('jimp')

module.exports = class TestProfileCommand extends Command {
    constructor() {
        super('testprofile', {
            aliases: ['testprofile', 'profiletest'],
            args: [
                {
                    id: 'member',
                    type: 'user',
                    default: message => message.author
                }
            ],
            ownerOnly: true
        })
    }

    async exec(message, { member }) { 
        try {
            const db = await User.findOne({ discordId: member.id })

            jimp.read('./assets/profile-background-blank.png', (error, blank) => {
                if(error) {
                    const embed = embedConsoleError(error)
                    return message.channel.send(embed)
                }

                jimp.read(getAvatarUrl(member), (error, avatar) => {
                    if(error) {
                        const embed = embedConsoleError(error)
                        return message.channel.send(embed)
                    }

                    jimp.read('./assets/profile-background.png', (error, background) => {
                        if(error) {
                            const embed = embedConsoleError(error)
                            return message.channel.send(embed)
                        }

                        jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(font => {
                            avatar.resize(jimp.AUTO, 133)

                            blank
                            .composite(avatar, 30, 48)
                            .composite(background, 0, 0)
                            .print(font, 188, 68, member.tag)
                            .print(font, 568, 68, `Level: ${db.level}`)
                            .write('./assets/profile-background-user.png')
                        })
                        .then(() => {
                            message.channel.send('image generated', { files: ['./assets/profile-background-user.png']})
                        })
                    })
                })
            })

        } catch(error) {
            const embed = embedConsoleError(error)
            return message.channel.send(embed)
        }
    }
}