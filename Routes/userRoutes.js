const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.get('/users', controller.GetAll)

router.post('/create', middleware.stripToken, middleware.verifyToken, controller.CreateUser)
router.post('/login', controller.Login)
router.post('/reset-password', middleware.stripToken, middleware.verifyToken, controller.ResetPassword)
router.post('/:id/change-password', middleware.stripToken, middleware.verifyToken, controller.ChangePassword) // middleware.verifyToken, middleware.stripToken, 


router.put('/users/edit', middleware.stripToken, middleware.verifyToken, controller.UpdateDetails)
router.patch('/activate-deactivate', middleware.stripToken, middleware.verifyToken, controller.ActivateDeactivate)

router.get('/session', middleware.stripToken, middleware.verifyToken, controller.CheckSession)
router.delete('/users/:id', middleware.stripToken, middleware.verifyToken, controller.DeleteUser)


module.exports = router