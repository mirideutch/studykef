const router = require('express').Router()
const letterController= require('../Controllers/letterController')

router.get('/getLetter/:letter',letterController.getLetter)
router.post('/createLetter',letterController.createLetter)
router.get('/getSoundLetters/:labelLetters',letterController.getSoundLetters)
router.get('/getSoundwordWithImageword/:arrletter',letterController.getSoundwordWithImageword)
router.get('/getFourLetter', letterController.getFourLetter)
router.get('/getNextLetter/:letter', letterController.getNextLetter)


module.exports=router