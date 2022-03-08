const express = require('express')
const router = express.Router()
const OrderController = require('../controller/order')
const passport = require('passport')

const jwtAuthenication = passport.authenticate('jwt', { session: false })

router.post('/', OrderController.createOrder)
router.get('/', OrderController.getOrder)
router.get('/admin',jwtAuthenication, OrderController.getOrder)
router.put('/status/:id', OrderController.updateOrderStatus)
router.put('/status/admin/:id', jwtAuthenication, OrderController.updateOrderStatus)

module.exports = router
