const express = require('express')
const router = express.Router()
const manageMenuController = require('../controller/manageMenu')
const multer = require('../config/cloud/multer')
const passport = require('passport')

const jwtAuthenication = passport.authenticate('jwt', { session: false })

router.post('/', jwtAuthenication, multer.single('file'), manageMenuController.createFood)
router.get('/', jwtAuthenication, manageMenuController.getFood)
router.get('/user', manageMenuController.getFood)
router.put('/:id', jwtAuthenication, multer.single('file'), manageMenuController.updateFood)
router.delete('/:id', jwtAuthenication, manageMenuController.deleteFood)

module.exports = router