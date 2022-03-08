const express = require('express')
const router = express.Router()
const creditController = require('../controller/credit')
const passport = require('passport')
const jwtAuthenication = passport.authenticate('jwt', { session: false })


router.post('/',jwtAuthenication, creditController.createCredit )

module.exports = router