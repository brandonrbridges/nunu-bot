const { Listener } = require('discord-akairo')

module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        })
    }

    exec() {
        // Prepared to setup bot when ready
    }
}