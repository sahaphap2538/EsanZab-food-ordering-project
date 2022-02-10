const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
            cb(new Error("File type is not supported"), false)
            return
        }
        cb(null, true)
    }
})