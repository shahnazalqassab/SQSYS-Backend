const router = require('express').Router()
const controller = require('../controllers/categories')

router.get('/', controller.getAllCategories)
router.get('/all-subCategories', controller.getSubCategoriesByCategory)
router.post('/', controller.createCategory)
router.post('/:id/create-subCategory', controller.createSubCategory)
router.put('/:id', controller.modifyCategory)
router.put('/:id/:id', controller.modifySubCategory)
router.delete('/:id', controller.deleteCategory)
router.delete('/:id/:id', controller.deleteSubCategory)  

module.exports = router