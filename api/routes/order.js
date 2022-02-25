const express = require('express')
const router = express.Router()
const OrderController = require('../controller/order')

router.post('/', OrderController.createOrder)
router.get('/', OrderController.getOrder)
router.put('/status/:id', OrderController.updateOrderStatus)

module.exports = router
