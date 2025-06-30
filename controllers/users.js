const { User } = require('../Models')



// GET ALL USERS
const GetAll = async (req, res) => {

}
// CREATE USER
const CreateUser = async (req, res) => {
    try {
        const { username, name, email, password, user_role } = req.body
        console.log(req.body)

        let existingUser = await User.findOne({ username })
        let existingEmail = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).send({ status: 'Error', message: 'Username already exists' })
        } else {
            if (existingEmail) {
                return res.status(400).send({ status: 'Error', message: 'Email already exists' })
            } else {
                let hashedPassword = await middleware.passwordHashing(password)

                const newUser = await User.create({
                    username, name, email, hashedPassword, user_role, status: 'active'})
                    res.status(200).send(newUser)
                }
        }
    } catch (error) {
        console.error(error)
        res.status(401).send({status: 'Error', message: 'An error has occurred while creating user' })
    }
}

// GET USER BY ID
const GetUserById = async (req, res) => {

}

// LOGIN USER
const Login = async (req, res) => {

}

// UPDATE USER
const UpdateDetails = async (req, res) => {

}


// Activate/Deactivate User
const ActivateDeactivate = async (req, res) => {

}


// SESSION CHECK
const CheckSession = async (req, res) => {
    const { payload } = res.locals
    res.status(200).send(payload)
}

module.exports = {
    GetAll,
    CreateUser,
    GetUserById,
    Login,
    UpdateDetails,
    ActivateDeactivate,
    CheckSession
}