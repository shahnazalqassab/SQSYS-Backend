const { User } = require('../Models')



// GET ALL USERS
const GetAll = async (req, res) => {

}
// CREATE USER
const CreateUser = async (req, res) => {

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