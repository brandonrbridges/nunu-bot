const { Command } = require('discord-akairo')
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const { embedConsoleError, embedStandard, paginate } = require('../../functions/helpers')

class DefinitionCommand extends Command {
  constructor () {
    super('define', {
      aliases: ['define', 'd'],
      category: 'utility',
      args: [
        {
          id: 'term',
          match: 'content',
          type: 'string'
        }
      ],
      description: {
        content: 'Finds definitions from Urban Dictionary.',
        usage: '<term>',
        examples: ['league of legends']
      }
    })
  }

  /**
   * Executes the command.
   * @param {MessageChannel} message Discord channel message.
   * @returns {Promise<void>}
   * @public
   */
  async exec (message, { term }) {
    if (!term){
      const embed = embedStandard('You must provide a definition.')
      return message.channel.send(embed)
    }

    try {
      const definitions = await this.fetchDefinition(term)
      if (!definitions) {
        const embed = embedStandard('No definitions found.')
        return message.channel.send(embed)
      }

      const embeds = this._generateEmbeds(definitions)
      paginate(embeds, { 
        title: term, 
        channel: message.channel, 
        author: message.author 
      })
    } catch(error) {
      const embed = embedConsoleError(error)
      return message.channel.send(embed)
    }
  }

  /**
   * Fetches the definition of a term
   * @param {string} term Urban dictionary definition term
   * @returns {Promise<Array<Object>>}
   * @public
   */
  async fetchDefinition (term) {
    const { data: { list } } = await axios.get('http://api.urbandictionary.com/v0/define', {
      params: { term }
    })

    if (!list.length) return false
    if (!list) throw new Error('Invalid API response.')
    return list
  }

  /**
   * Generates embed messages from definitions array
   * @param {Array<Object>} definitions Definitions array
   * @returns {Array<MessageEmbed>}
   * @private
   */
  _generateEmbeds (definitions) {
    const embeds = []

    for (const definition of definitions) {
      const embed = new MessageEmbed()
        .setURL(definition.permalink)
        .setDescription(definition.definition)
        .addField('Example', definition.example)
        .addField('Author', definition.author, true)
        .addField('👍', definition.thumbs_up, true)
        .addField('👎', definition.thumbs_down, true)

      embeds.push(embed)
    }

    return embeds
  }
}

module.exports = DefinitionCommand
