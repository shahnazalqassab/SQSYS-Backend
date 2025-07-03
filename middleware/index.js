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
    // let token = await jwt.sign(payload, SECRET, { expiresIn: '1h' })
    let token = await jwt.sign(payload, SECRET)
    return token
}


// STRIPPING TOKEN FROM REQUEST HEADERS
const stripToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]
            if (token && token.split('.').length === 3) { //  token format check
                res.locals.token = token
                return next()
            }
        }
        res.status(401).send({ status: 'Error', message: 'Unauthorized: No or malformed token' })
    } catch (error) {
        console.log(error)
        res.status(401).send({ status: 'Error', message: 'Strip Token Error!' })
    }
}


// VERIFYING JWT TOKEN
const verifyToken = (req, res, next) => {
    const { token } = res.locals

    if (!token) {
        return res.status(401).send({ status: 'Error', message: 'No token provided' })
    }

    try {
        console.log('Verifying token:', token)
        let payload = jwt.verify(token, SECRET)
        res.locals.payload = payload
        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'Error', message: 'Invalid or expired token!' })
    }
}

module.exports = {
    passwordHashing,
    verifyPassword,
    createToken,
    stripToken,
    verifyToken
}