const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.put('/points/:id', userController.updatePoints)
router.get('/points/:id', userController.getPoints)

module.exports = router