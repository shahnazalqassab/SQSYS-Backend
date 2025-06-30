const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const ROUNDS = parseInt(process.env.SALT_ROUNDS)
const SECRET = process.env.SESSION_SECRET

// encrypting passwords
const passwordHashing = async (password) => {
    let hashedPassword = await bcrypt.hash(password, ROUNDS)
    return hashedPassword
}


// comparing passwords
const verifyPassword = async (password, dbPassword) => {
    let matched = await bcrypt.compare(password, dbPassword)
    return matched
}

