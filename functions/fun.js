/**
 * Import Modules
 */
const axios = require('axios')

/**
 * Fetch Meme
 * 
 * @description self explanatory
 * 
 * @version 1.0.0
 */
const fetchMeme = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://some-random-api.ml/meme')
        .then(response => {
            return resolve(response.data)
        })
        .catch(error => {
            return reject(error)
        })
    })
}

/**
 * Hug User
 * 
 * @description self explanatory
 * 
 * @argument member @type MemberMention
 * 
 * @version 1.0.0
 */
const fetchHugGif = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.nekos.fun:8080/api/hug')
        .then(response => {
            const image = response.data.image
            return resolve(image)
        })
        .catch(error => {
            return reject(error)
        })
    })
}

/**
 * Kiss User
 * 
 * @description self explanatory
 * 
 * @argument member @type MemberMention
 * 
 * @version 1.0.0
 */
const fetchKissGif = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.nekos.fun:8080/api/kiss')
        .then(response => {
            const image = response.data.image
            return resolve(image)
        })
        .catch(error => {
            return reject(error)
        })
    })
}

/**
 * Exports
 */
module.exports = {
    fetchMeme,
    fetchHugGif,
    fetchKissGif
}