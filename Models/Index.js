const mongoose = require('mongoose')
const userSchema = require('./User')
const productSchema = require('./Product')
const { categorySchema, subCategorySchema } = require('./Category') 

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Category = mongoose.model('Category', categorySchema)
const SubCategory = mongoose.model('SubCategory', subCategorySchema)

module.exports = {
    User,
    Product,
    Category,
    SubCategory
} 