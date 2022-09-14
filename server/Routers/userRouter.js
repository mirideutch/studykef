const router = require('express').Router()
const userController= require('../Controllers/userController')

router.get('/getUser/:name/:pass',userController.getUser)
router.delete('/deleteUser/:password',userController.deleteUser)
router.post('/createUser',userController.createUser)

module.exports=router