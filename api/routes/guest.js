const express = require('express')
const router = express.Router()
const guestController = require('../controller/guest')


router.post('/login', guestController.loginGuests)

module.exports = router