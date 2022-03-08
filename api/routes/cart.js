const express = require('express')
const router = express.Router()
const cartController = require('../controller/cart')
const passport = require('passport')

const jwtAuthenication = passport.authenticate('jwt', { session: false })

router.post('/', cartController.createCart)

router.get('/', cartController.getCart )
router.get('/food', cartController.getFood)

router.put('/', cartController.updateCart )
router.put('/total/:id', cartController.updateTotal)
router.put('/discount/:id', cartController.updateDiscount)
router.put('/discount/user/:id', jwtAuthenication, cartController.updateDiscount)

router.delete('/:CartId/:FoodId', cartController.deleteCartItem )

module.exports = router 