const mongoose = require('mongoose')
const userSchema = require('./User')
const productSchema = require('./Product')
const { categorySchema, subCategorySchema } = require('./Category') 
const supplierSchema = require('./Supplier')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Category = mongoose.model('Category', categorySchema)
const SubCategory = mongoose.model('SubCategory', subCategorySchema)
const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = {
    User,
    Product,
    Category,
    SubCategory,
    Supplier
} 