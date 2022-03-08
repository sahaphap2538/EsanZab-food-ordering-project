const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if (req.body.file !== 'null' || req.body.file !== 'undefined') {
            const extname = path.extname(file.originalname).toLowerCase()
            if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png' && extname !== '.jfif') {
                cb(new Error("File type is not supported"), false)
                return
            }
        }
        cb(null, true)
    }
})