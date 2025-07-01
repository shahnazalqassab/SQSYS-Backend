const { Schema } = require('mongoose')

const supplierSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    fax: { type: String, required: true },
    email: { type: String, required: true }, 
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        productName: { type: String, required: true }
    }],
    created_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{
    timestamps: true
})

module.exports = supplierSchema