const { User } = require('../Models')
const middleware = require('../middleware')



// GET ALL USERS
const GetAll = async (req, res) => {
    try {  
        const users = await User.find({})
        res.status(200).send(users)
    }catch (error) {
        console.error(error)
        res.status(500).send({ status: 'Error', message: 'An error has occurred while fetching users' })
    }
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
        console.log(error)
        res.status(401).send({status: 'Error', message: 'An error has occurred while creating user' })
    }
}


// LOGIN USER
const Login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ username })

        if (!user) {
            return res.status(401).send({ status: 'Error', message: 'Invalid username' })
        }
        let isValid = await middleware.verifyPassword(password, user.password)

        if (isValid) {
            let payload = {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                user_role: user.user_role,
                status: user.status
            }
            let token = await middleware.createToken(payload)
            return res.status(200).send({ status: 'Success', message: 'Login successful', token, user: payload })
        }
        
        res.status(402).send({ status: 'Error', message: 'Invalid password' })

    } catch (error) {
        console.log(error)
        res.status(401).send({ status: 'Error', message: 'An error has occurred while logging in'})
    }
}

// UPDATE USER
const UpdateDetails = async (req, res) => {

    const { _id, name, email } = req.body

    try {
        const user = await User.findByIdAndUpdate(
            _id , { name, email },
            { new: true }) // RETURNS THE UPDATED DOCUMENT
        
        await user.save()
        res.status(200).send({ status: 'Success', message: 'User details updated successfully', user })
    
    } catch (error) {
        console.log(error)
        res.status(501).send({ status: 'Error', message: 'An error has occurred while updating user details' })
    }
}

// RESET PASSWORD
const ResetPassword = async (req, res) => {
    const { _id } = req.body
    
    const password = "12345678"

    try {
        let hashedPassword = await middleware.passwordHashing(password)

        const user = await User.findByIdAndUpdate(
            _id, { password: hashedPassword },
            { new: true })
        
        await user.save()
        res.status(200).send({ status: 'Success', message: 'Password reset successfully', user })
    
    } catch (error) {
        console.log(error)
        res.status(502).send({ status: 'Error', message: 'An error has occurred while resetting password' })
    }
}


// CHANGE PASSWORD
const ChangePassword = async (req, res) => {
    const { _id, oldPassword, newPassword } = req.body 

    try {
        if ( oldPassword === newPassword ) {
            return res.status(400).send({ status: 'Error', message: 'New password cannot be the same as old password' })
        
        } else {
            if ( newPassword.length < 8 ) {
            return res.status(401).send({ status: 'Error', message: 'New password must be at least 8 characters long' })
            
            } else {
                const user = await User.findById( _id )

                user.password = await middleware.passwordHashing(newPassword)
                await user.save()
                res.status(200).send({ status: 'Success', message: 'Password has been changed successfully' })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(503).send({ status: 'Error', message: 'An error has occurred while changing password' })
    }
}


// ACTIVATE/DEACTIVATE USER
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
    ResetPassword,
    ActivateDeactivate,
    CheckSession
}