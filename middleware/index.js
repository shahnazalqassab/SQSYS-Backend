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


// STRIPPING TOKEN FROM REQUEST HEADERS
const stripToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        if (token) {
        res.locals.token = token
        return next()
        }
        res.status(401).send({ status: 'Error', message: 'Unauthorized' })

    } catch (error) {
        console.log(error)
        res.status(402).send({ status: 'Error', message: 'Strip Token Error!' })
    }
}

// VERIFYING JWT TOKEN
const verifyToken = (req, res, next) => {
    const { token } = res.locals

    try {
        let payload = jwt.verify(token, SESSION_SECRET)
        if (payload) {
        res.locals.payload = payload
        return next()
        }
        res.status(403).send({ status: 'Error', message: 'Unauthorized' })

    } catch (error) {
        console.log(error)
        res.status(404).send({ status: 'Error', message: 'Verify Token Error!' })
    }
}

module.exports = {
    passwordHashing,
    verifyPassword,
    createToken,
    stripToken,
    verifyToken
}