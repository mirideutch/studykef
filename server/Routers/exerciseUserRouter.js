const router = require('express').Router()
const exerciseUserController= require('../Controllers/exerciseUserController')

router.post('/addGame',exerciseUserController.addGame)
router.patch('/updateMark',exerciseUserController.updateMark)
// router.get('/getMark/:user/:label',exerciseUserController.getMark)
router.get('/getAvgMark/:birthDate/:user/:labels',exerciseUserController.getAvgMark)
router.get('/Mark/:user/:label',exerciseUserController.Mark)

module.exports=router