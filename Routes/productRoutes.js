const router = require('express').Router()
const controller = require('../controllers/products')
const middleware = require('../middleware')


router.post('/create', middleware.verifyToken, controller.createProduct) // Create a new product

router.get('/:id', controller.getProductDetails) // Get product details by ID
router.get('/', controller.getAllProducts) // Get all products
router.get('/category/:categoryId', controller.getProductsByCategory) // Get products by category
router.get('/tags/:tag', controller.getProductsByTags) // Get products by tags
router.get('/status/:status', controller.getProductsByStatus) // Get products by status
router.get('/newly-added', controller.getNewlyAddedProducts) // Get newly added products

router.delete('/:id', middleware.verifyToken, controller.deleteProduct) // Delete a product by ID

router.patch('/:id/tags', middleware.verifyToken, controller.modifyProductTags) // Modify product tags
router.patch('/:id/status', middleware.verifyToken, controller.modifyProductStatus) // Modify product status
router.patch('/:id/options', middleware.verifyToken, controller.modifyProductOptions) // Modify product


module.exports = router

// GET /products/newly-added?limit=5