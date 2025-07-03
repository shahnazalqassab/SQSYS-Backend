const router = require('express').Router()
const controller = require('../controllers/suppliers')
const middleware = require('../middleware')

router.get('/', controller.getAllSuppliers)
router.get('/:id', controller.getSupplier) // middleware.verifyToken, middleware.stripToken, 
router.get('/:id/product', controller.getSuppliersByProduct) // middleware.verifyToken, middleware.stripToken,

router.post('/create', controller.createSupplier)
router.put('/:id', controller.updateSupplier)
router.delete('/:id', controller.deleteSupplier)


module.exports = router