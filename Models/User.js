const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    encryptedPassword: { type: String, required: true },
    user_role: { type: String, enum: ['admin', ' salesperson', 'inventory staff']},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
},
{
    timestamps: true
})

module.exports = userSchema