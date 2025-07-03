const router = require('express').Router()
const controller = require('../controllers/users')
const middleware = require('../middleware')

router.get('/users', controller.GetAll)

router.post('/create', controller.CreateUser)
router.post('/login', controller.Login)
router.post('/reset-password', controller.ResetPassword)
router.post('/:id/change-password', controller.ChangePassword) // middleware.verifyToken, middleware.stripToken, 


router.put('/users/edit', controller.UpdateDetails)
router.patch('/activate-deactivate', controller.ActivateDeactivate)

router.get('/session', middleware.verifyToken, middleware.stripToken, controller.CheckSession)
router.delete('/users', controller.DeleteUser)


module.exports = router