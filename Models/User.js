const { Schema } = require('mongoose')

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    password: { type: String, required: true },
    category: { type: String, enum: ['admin', ' salesperson', 'supervisor', 'inventory manager']},
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
},
{
    timestamps: true
})

module.exports = userSchema