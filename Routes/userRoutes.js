const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.get('/:id/users', controller.GetAll)

router.post('/create', controller.CreateUser)
router.post('/login', controller.Login)
router.post('/:id/reset-password', middleware.verifyToken, middleware.stripToken, controller.ResetPassword)
router.post('/:id/change-password', middleware.verifyToken, middleware.stripToken, controller.ChangePassword) // middleware.verifyToken, middleware.stripToken, 


router.put('/:id/users', middleware.verifyToken, middleware.stripToken, controller.UpdateDetails)
router.patch('/:id/activate-deactivate', middleware.verifyToken, middleware.stripToken, controller.ActivateDeactivate)

router.get('/session', middleware.verifyToken, middleware.stripToken, controller.CheckSession)



module.exports = router