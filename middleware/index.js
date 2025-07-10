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
    console.log(token)
    return token
}


// STRIPPING TOKEN FROM REQUEST HEADERS
const stripToken = (req, res, next) => {
    console.log('Authorization header:', req.headers['authorization'])
    try {
        const token = req.headers['authorization'].split(' ')[1]
        
        if (token) {
                res.locals.token = token
                return next()
            }
        
        res.status(401).send({ status: 'Error', message: 'Unauthorized: No or malformed token' })
    } catch (error) {
        console.log(error)
        res.status(401).send({ status: 'Error', message: 'Strip Token Error!' })
    }
}


// VERIFYING JWT TOKEN
const verifyToken = (req, res, next) => {
    console.log(res.locals)
    const { token } = res.locals

    try {
        let payload = jwt.verify(token, SECRET)
        
        if (payload) {
            res.locals.payload = payload
        return next()
    } 
    res.status(401).send({ status: 'Error', message: 'Unauthorized' })

}catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'Error', message: 'Verify Token Error!' })
    }
}

module.exports = {
    passwordHashing,
    verifyPassword,
    createToken,
    stripToken,
    verifyToken
}