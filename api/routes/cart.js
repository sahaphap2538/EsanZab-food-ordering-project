const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')

router.post('/', cartController.createCart)
router.get('/', cartController.getCart )
router.get('/food', cartController.getFood)
router.put('/', cartController.updateCart )
router.put('/total/:id', cartController.updateTotal)
router.delete('/:CartId/:FoodId', cartController.deleteCartItem )

module.exports = router