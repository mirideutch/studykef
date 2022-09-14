const router = require('express').Router()
const wordController= require('../Controllers/wordController')

router.get('/getWord/:wordId',wordController.getWord)
router.post('/createWord',wordController.createWord)

router.post('/createWordToLetter/:letter',wordController.createWordToLetter)

module.exports=router