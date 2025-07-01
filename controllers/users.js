const { User } = require('../Models')
const middleware = require('../middleware')



// GET ALL USERS
const GetAll = async (req, res) => {
    try {  
        const users = await User.find({})
        res.status(200).json(users)
    }catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching users' })
    }
}


// CREATE USER
const CreateUser = async (req, res) => {
    try {
        const { username, name, email, user_role } = req.body
        console.log(req.body)

        let existingUser = await User.findOne({ username })
        let existingEmail = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ status: 'Error', message: 'Username already exists' })
        } else {
            if (existingEmail) {
                return res.status(400).json({ status: 'Error', message: 'Email already exists' })
            } else {
                let encryptedPassword = await middleware.passwordHashing('12345678') 

                const newUser = await User.create({
                    username, name, email, encryptedPassword, user_role, status: 'active'})
                    res.status(200).json({status: 'Success', message: 'User has been created', newUser })
                }
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({status: 'Error', message: 'An error has occurred while creating user' })
    }
}


// LOGIN USER
const Login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ status: 'Error', message: 'Invalid username' })
        }
        let isValid = await middleware.verifyPassword(password, user.encryptedPassword)

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
            return res.status(200).json({ status: 'Success', message: 'Login successful', token, user: payload })
        }
        
        res.status(402).json({ status: 'Error', message: 'Invalid password' })

    } catch (error) {
        console.log(error)
        res.status(401).json({ status: 'Error', message: 'An error has occurred while logging in'})
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
        res.status(200).json({ status: 'Success', message: 'User details updated successfully', user })
    
    } catch (error) {
        console.log(error)
        res.status(501).json({ status: 'Error', message: 'An error has occurred while updating user details' })
    }
}

// RESET PASSWORD
const ResetPassword = async (req, res) => {
    const { _id } = req.body
    
    const password = "12345678"

    try {
        let hashedPassword = await middleware.passwordHashing(password)

        const user = await User.findByIdAndUpdate(
            _id, { encryptedPassword: hashedPassword },
            { new: true })
        
        await user.save()
        res.status(200).json({ status: 'Success', message: 'Password reset successfully', user })
    
    } catch (error) {
        console.log(error)
        res.status(502).json({ status: 'Error', message: 'An error has occurred while resetting password' })
    }
}


// CHANGE PASSWORD
const ChangePassword = async (req, res) => {
    const { _id, oldPassword, newPassword } = req.body 

    try {
        const user = await User.findById( _id )
        let isValid = await middleware.verifyPassword(oldPassword, user.encryptedPassword)

        if (isValid) {
            if ( oldPassword === newPassword ) {
                return res.status(400).json({ status: 'Error', message: 'New password cannot be the same as old password' })
            
            } else {
                if ( newPassword.length < 8 ) {
                return res.status(401).json({ status: 'Error', message: 'New password must be at least 8 characters long' })
                
                } else {
                    user.encryptedPassword = await middleware.passwordHashing(newPassword)
                    await user.save()
                    res.status(200).json({ status: 'Success', message: 'Password has been changed successfully' })
                }
            }
        } else {
            return res.status(402).json({ status: 'Error', message: 'Old password is incorrect' })
        }
    } catch (error) {
        console.log(error)
        res.status(503).json({ status: 'Error', message: 'An error has occurred while changing password' })
    }
}


// ACTIVATE/DEACTIVATE USER
const ActivateDeactivate = async (req, res) => {
    const { _id, status } = req.body

    try {
        const user = await User.findByIdAndUpdate(_id, { status }, { new: true })
        res.status(200).json({ status: 'Success', message: `User has been ${status}d successfully`, user })
    
    } catch (error) {
        console.log(error)
        res.status
    }
}


// SESSION CHECK
const CheckSession = async (req, res) => {
    const { payload } = res.locals
    res.status(200).send(payload)
}

module.exports = {
    GetAll,
    CreateUser,
    Login,
    UpdateDetails,
    ResetPassword,
    ChangePassword,
    ActivateDeactivate,
    CheckSession
}