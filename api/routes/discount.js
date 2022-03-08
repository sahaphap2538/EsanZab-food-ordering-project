const express = require('express')
const router = express.Router()
const discountController = require('../controller/discount')
const passport = require('passport')

const jwtAuthenication = passport.authenticate('jwt', { session: false })

router.get('/', discountController.getDiscount)
router.get('/user', jwtAuthenication, discountController.getDiscount)
router.get('/item', discountController.getDiscountItem)
router.get('/item/user', jwtAuthenication, discountController.getDiscountItem)

router.put('/quantity/:id', discountController.updateDiscountQuantity)
router.put('/quantity/user/:id', jwtAuthenication, discountController.updateDiscountQuantity)
router.put('/item/:DiscountId/:UserId', discountController.updateDiscountItemQuntity)
router.put('/item/user/:DiscountId/:UserId', jwtAuthenication , discountController.updateDiscountItemQuntity)

router.post('/', discountController.createDiscountItem)
router.post('/user', jwtAuthenication, discountController.createDiscountItem)

module.exports = router
