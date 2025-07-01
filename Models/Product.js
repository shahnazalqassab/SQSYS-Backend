const { Schema } = require('mongoose')

const productSchema = new Schema({
    name: { type: String, required: true },
    selling_price: { type: Number, required: true },
    cost_price: { type: Number, required: true },
    key_features: { type: String, required: true },
    status: { type: String, enum: ['in stock', ' out of stock', 'pre-order', 'discontinued', 'coming soon'], default: 'in stock' },
    quantity_available: { type: Number, required: true },
    min_balance: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    ean: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    pictures: [{
        url: { type: String, required: true },
        alt_text: { type: String, required: true }
    }],
    options: [{
        name: { type: String, required: true },
        values: [{ type: String, required: true }]
    }],
    category: { type: Schema.Types.ObjectId, ref: 'SubCategory', required: true },
},
{
    timestamps: true
})

module.exports = productSchema