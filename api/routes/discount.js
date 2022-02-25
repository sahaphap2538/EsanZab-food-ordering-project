const express = require('express')
const router = express.Router()
const discountController = require('../controller/discount')

router.get('/', discountController.getDiscount)
router.put('/quantity/:id', discountController.updateDiscountQuantity)

module.exports = router
