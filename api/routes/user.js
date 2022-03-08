const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const passport = require('passport')

const jwtAuthenication = passport.authenticate('jwt', { session: false })

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.put('/points/:id', userController.updatePoints)
router.put('/points/user/:id', jwtAuthenication, userController.updatePoints)
router.get('/points/:id', userController.getPoints)

module.exports = router