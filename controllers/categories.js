const { Category, SubCategory } = require('../Models')


// CREATING NEW CATEGORY
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        
        const newCategory = new Category({ name })
        await newCategory.save()

        res.status(201).json({ status: 'Successful', message: 'Category created successfully', category: newCategory });

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error creating category', error: error.message });
    }
}


// CREATING SUB CATEGORY
const createSubCategory = async (req, res) => {
    try {
        const { name, categoryId } = req.body
        
        const category = await Category.findById(categoryId)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' })

        } else {
            const newSubCategory = new SubCategory({ name, parentCategory: categoryId })
            await newSubCategory.save()

            res.status(201).json({ status: 'Successful', message: 'Sub-category created successfully', subCategory: newSubCategory });
        }

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error creating sub-category', error: error.message })
    }
}


// MODIFYING CATEGORY
const modifyCategory = async (req, res) => {
    try{
        const { categoryId } = req.body
        const { name } = req.body

        const category = await Category.findById(categoryId)
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' })
        } else {
            category.name = name
            await category.save()

            res.status(200).json({ status: 'Successful', message: 'Category updated successfully', category })
        }
    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error updating category', error: error.message })
    }
}


// MODIFYING SUB CATEGORY
const modifySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.body
        const { name, categoryId } = req.body

        const subCategory = await SubCategory.findById(subCategoryId)

        if (!subCategory) {
            return res.status(404).json({ status: 'Not Found', message: 'Sub-category not found' })
        } else {
            subCategory.name = name
            subCategory.parentCategory = categoryId
            await subCategory.save()

            res.status(200).json({ status: 'Successful', message: 'Sub-category updated successfully', subCategory })
        }
    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error updating sub-category', error: error.message })
    }
}

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => { 
    try {
        const categories = await Category.find().populate('subCategories')
        
        if (categories.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: 'No categories found' })
        } else {
            res.status(200).json({ status: 'Successful', message: 'Categories retrieved successfully', categories })
        }
    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error retrieving categories', error: error.message })
    }
}

// GET SUBCATEGORY PER CATEGORY
const getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.body

        const subCategories = await SubCategory.find({ parentCategory: categoryId })
        if (subCategories.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: 'No sub-categories found for this category' })
        } else {
            res.status(200).json({ status: 'Successful', message: 'Sub-categories retrieved successfully', subCategories })
        }

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error retrieving sub-categories', error: error.message })
    }
}


// DELETE CATEGORY
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body

        const hasSubCategories = await SubCategory.exists({ parentCategory: categoryId })   
        if (hasSubCategories) {
            return res.status(400).json({ status: 'Bad Request', message: 'Cannot delete category with existing sub-categories' })
        }

        const category = await Category.findByIdAndDelete(categoryId)
        if (!category) {
            return res.status(404).json({ status: 'Not Found', message: 'Category not found' })
        } else {
            res.status(200).json({ status: 'Successful', message: 'Category deleted successfully', category })
        }

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error deleting category', error: error.message })
    }
}


// DELETE SUB CATEGORY
const deleteSubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.body

        const subCategory = await SubCategory.findByIdAndDelete(subCategoryId)

        if (!subCategory) {
            return res.status(404).json({ status: 'Not Found', message: 'Sub-category not found' })
        } else {
            res.status(200).json({ status: 'Successful', message: 'Sub-category deleted successfully', subCategory })
        }
    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error deleting sub-category', error: error.message })
    }
}


module.exports = {
    createCategory,
    createSubCategory,
    modifyCategory,
    modifySubCategory,
    getAllCategories,
    getSubCategoriesByCategory,
    deleteCategory,
    deleteSubCategory
}