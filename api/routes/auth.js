const express = require('express')
const router = express.Router()
const passport = require('passport')

const facebookWillAuth = passport.authenticate('facebook')

router.get('/facebook', facebookWillAuth)

module.exports = router