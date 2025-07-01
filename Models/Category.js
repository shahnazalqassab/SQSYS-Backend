const { Schema } = require('mongoose')

const categorySchema = new Schema({
    name: { type: String, required: true }
})

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
})

module.exports = {
    categorySchema,
    subCategorySchema
}
