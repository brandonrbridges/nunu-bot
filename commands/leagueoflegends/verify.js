// Akairo
const { Command } = require('discord-akairo')

// Functions
const {
    embedConsoleError,
    embedError,
    embedStandard,
    embedSuccess,
} = require('../../functions/helpers')

// Kayn
const { Kayn } = require('kayn')

module.exports = class VerifyCommand extends Command {
    constructor() {
        super('verify', {
            aliases: ['verify'],
            args: [
                {
                    id: 'summoner',
                    type: 'string'
                }
            ]
        })
    }
    
    async exec(message, { summoner }) {
        verify(message, summoner)
    }
}

const apiKey = 'RGAPI-80fc6a46-c9bd-4829-9291-9fa4ad2a9e8d'

const kayn = Kayn(apiKey)({
    region: 'euw',
    apiURLPrefix: 'https://%s.api.riotgames.com',
    locale: 'en_US',
    debugOptions: {
        isEnabled: true,
        showKey: false,
    },
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    },
    cacheOptions: {
        cache: null,
        timeToLives: {
            useDefault: false,
            byGroup: {},
            byMethod: {},
        },
    },
})

const tierList = {
    UNRANKED: -1,
    IRON: 0,
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
    PLATINUM: 4,
    DIAMOND: 5,
    MASTER: 6,
    GRANDMASTER: 7,
    CHALLENGER: 8
}

const queueTypes = [
    'RANKED_SOLO_5x5'
]

const generateCode = () => {
    return `loleuwdiscord-${Math.random().toString(36).substr(2, 15)}`
}

const getHighestTier = async (stats) => {
    let highestTier = tierList['UNRANKED']

    if(stats.length > 0) {
        Object.entries(stats).forEach(([key, value]) => {
            if(queueTypes.includes(value.queueType)) {
                if(highestTier < tierList[value.tier])
                highestTier = tierList[value.tier]
            }
        })

        highestTier = Object.keys(tierList).find(key => tierList[key] == highestTier)

        return highestTier
    }
}

const getSummoner = async (summonerName) => {
    const summoner = await kayn.Summoner.by.name(summonerName).regionNoThrow(null)
    return summoner
}

const getStats = async (summonerId) => {
    const stats = await kayn.League.Entries.by.summonerID(summonerId).regionNoThrow(null)
    return stats
}

const getCode = async (summonerId) => {
    const code = await kayn.ThirdPartyCode.by.summonerID(summonerId).regionNoThrow(null)
    return code
}

const sendVerificationSteps = (user, code) => {
    const embed = embedStandard(`✅ ${user}, please follow the steps below to get verified!`).addField('Steps to Verify',
    `
    \n
    Your code: **${code}**
    \n
    Please copy the code above and follow these steps:
    **1.** Open League of Legends to the main screen
    **2.** Click the Settings cog in the top right corner
    **3.** On the side navigation, select Verification
    **4.** Paste the code provided in the field and hit Save
    `
    )
    
    return user.send(embed)
}

const verify = async (message, summonerName) => {
    try {
        if(!summonerName) return message.channel.send('Please enter a summoner name')

        const s = message.content.substr(message.content.indexOf(' ') + 1)

        console.log(s)

        const summoner = await getSummoner(s)
        const stats = await getStats(summoner.id)
        const highestTier = await getHighestTier(stats)

        const tempCode = generateCode()

        sendVerificationSteps(message.author, tempCode)

        setTimeout(async () => {
            const code = await getCode(summoner.id)

            if(code == tempCode) {
                const role = message.guild.roles.cache.find(role => role.name == highestTier)

                if(role) {
                    message.member.roles.add(role)

                    const embed = embedSuccess(`🎉 ${message.author}, congratulations! I have added the ${role} role.`)
                    return message.channel.send(embed)
                } else {
                    const embed = embedError(`${message.author}, it appears this server does not have your rank role in their roles.`)
                    return message.channel.send(embed)
                }

            } else {
                const embed = embedError(`${message.author}, there was an issue verifying your Summoner. Ping @Veto.`)
                return message.channel.send(embed)
            }

        }, 60000)
    } catch(error) {
        const embed = embedConsoleError(error)
        return message.channel.send(embed)
    }
}