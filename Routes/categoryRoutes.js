const router = require('express').Router()
const controller = require('../controllers/categories')

router.get('/:id/all', controller.getAllCategories)
router.get('/:id/all-subCategories', controller.getSubCategoriesByCategory)
router.post('/:id/create-category', controller.createCategory)
router.post('/:id/create-subCategory', controller.createSubCategory)
router.put('/:id/update-category', controller.modifyCategory)
router.put('/:id/update-category', controller.modifySubCategory)
router.delete('/:id/delete-category', controller.deleteCategory)
router.delete('/:id/delete-subCategory', controller.deleteSubCategory)  

module.exports = router