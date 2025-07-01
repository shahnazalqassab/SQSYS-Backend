const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.post('/create', controller.CreateUser)
router.post('/login', controller.Login)
router.put('/update', middleware.verifyToken, middleware.stripToken, controller.UpdateDetails)
router.patch('/activate-deactivate', middleware.verifyToken, middleware.stripToken, controller.ActivateDeactivate)
router.post('/reset-password', middleware.verifyToken, middleware.stripToken, controller.ResetPassword)
router.post('/change-password', middleware.verifyToken, middleware.stripToken, controller.ChangePassword)
router.get('/all', middleware.verifyToken, middleware.stripToken, controller.GetAll)
router.get('/session', middleware.verifyToken, middleware.stripToken, controller.CheckSession)

module.exports = router