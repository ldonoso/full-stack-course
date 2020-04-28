const config = require('dotenv').config()

let MONGO_URL =
    process.env.NODE_ENV === 'test' ?
    process.env.MONGO_URL_TEST :
    process.env.MONGO_URL

let PORT = process.env.PORT

module.exports = {
    MONGO_URL: MONGO_URL,
    PORT: PORT,
}
