const db = require('../models')
const cloudinary = require('../config/cloud/cloudinary')

const createFood = async (req, res) => {
    try {
        if (req.body.file === 'undefined') {
            const newFoodNotImage = await db.Food.create({
                name: req.body.name,
                price: req.body.price,
                picture: null,
                cloudinary_id: null,
                category: req.body.category,
                status: req.body.status,
            })
            res.status(201).send(newFoodNotImage)
        } else {
            const imageData = await cloudinary.uploader.upload(req.file.path)
            const newFood = await db.Food.create({
                name: req.body.name,
                price: req.body.price,
                picture: imageData.secure_url,
                cloudinary_id: imageData.public_id,
                category: req.body.category,
                status: req.body.status,
            })
            res.status(201).send(newFood)
        }

    } catch (err) {
        console.log(err)
    }
}

const getFood = async (req, res) => {
    try {
        const food = await db.Food.findAll()
        res.status(200).send(food)
    } catch (err) {
        console.log(err)
    }
}

const updateFood = async (req, res) => {
    try {
        const targetID = Number(req.params.id)
        const targetFood = await db.Food.findOne({
            where: {
                id: targetID
            }
        })

        if (targetFood) {
            let imageData;

            if (req.file) {
                await cloudinary.uploader.destroy(targetFood.cloudinary_id)
                imageData = await cloudinary.uploader.upload(req.file.path)
            }

            if (req.body.name === 'undefined') {
                req.body.name = false
            }
            if (req.body.category === 'undefined') {
                req.body.category = false
            }
            if (req.body.status === 'undefined') {
                req.body.status = false
            }
            if (req.body.price === 'undefined') {
                req.body.price = false
            }

            await targetFood.update({
                name: req.body.name || targetFood.name,
                price: req.body.price || targetFood.price,
                picture: imageData?.secure_url || targetFood.picture,
                cloudinary_id: imageData?.public_id || targetFood.cloudinary_id,
                category: req.body.category || targetFood.category,
                status: req.body.status || targetFood.status
            })

            res.status(200).send({ message: "updating is success" });

        } else {
            res.status(404).send({ message: 'Food not found.' })
        }
    } catch (err) {
        console.log(err)
    }

}

const deleteFood = async (req, res) => {
    try {
        const targetID = Number(req.params.id)
        const targetFood = await db.Food.findOne({
            where: {
                id: targetID
            }
        })

        if (targetFood) {
            await targetFood.destroy()

            if (targetFood.cloudinary_id !== null) {
                await cloudinary.uploader.destroy(targetFood.cloudinary_id)
            }

            res.status(204).send({ message: 'Delete already.' })
        } else {
            res.status(404).send({ message: 'Food not found.' })
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    createFood,
    getFood,
    updateFood,
    deleteFood,
}