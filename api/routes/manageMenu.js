const express = require('express')
const router = express.Router()
const manageMenuController = require('../controller/manageMenu')
const multer = require('../config/cloud/multer')

router.post('/', multer.single('file'), manageMenuController.createFood)
router.get('/', manageMenuController.getFood)
router.put('/:id', multer.single('file'), manageMenuController.updateFood)
router.delete('/:id', manageMenuController.deleteFood)

module.exports = router