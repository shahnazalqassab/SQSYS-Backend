const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.get('/:id/all', controller.GetAll)
router.post('/create', controller.CreateUser)
router.post('/login', controller.Login)
router.patch('/:id/update/', controller.UpdateDetails)
router.post('/:id/reset-password', controller.ResetPassword)
router.post('/:id/change-password', controller.ChangePassword) // middleware.verifyToken, middleware.stripToken, 
router.patch('/:id/activate-deactivate', controller.ActivateDeactivate)
router.get('/session', middleware.verifyToken, middleware.stripToken, controller.CheckSession)

module.exports = router