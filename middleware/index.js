const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const ROUNDS = parseInt(process.env.SALT_ROUNDS)
const SECRET = process.env.SESSION_SECRET


// ENCRYPTING PASSWORDS
const passwordHashing = async (password) => {
    let hashedPassword = await bcrypt.hash(password, ROUNDS)
    return hashedPassword
}


// COMPARING PASSWORDS
const verifyPassword = async (password, dbPassword) => {
    let matched = await bcrypt.compare(password, dbPassword)
    return matched
}


// CREATING JWT TOKEN
const createToken = async (payload) => {
    let token = await jwt.sign(payload, SECRET, { expiresIn: '1h' })
    return token
}

