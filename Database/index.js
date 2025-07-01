const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfully Connected to MongoDB')
    })
    .catch((error) => {
        console.error('connection error', error.message)
    })

    const DB = mongoose.connection

    module.exports = DB