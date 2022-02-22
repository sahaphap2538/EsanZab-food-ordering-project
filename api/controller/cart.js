const db = require('../models')

const getCart = async (req, res) => {
    try {
        const cart = await db.Cart.findAll({
            include: db.Food
        })
        res.status(200).send(cart)
    } catch (err) {
        console.log(err)
    }
}

const createCart = async (req, res) => {
    try {
        const { quantity, CartId, FoodId } = req.body
        const newCart = await db.Cart_item.create({
            CartId: CartId,
            FoodId: FoodId,
            quantity: quantity
        })
            
        res.status(201).send(newCart)
    } catch (err) {
        console.log(err)
    }
}

const updateCart = async (req, res) => {
    try {
        const { quantity, CartId, FoodId } = req.body
        const targetCart = await db.Cart_item.findOne({
            where: {
                CartId: CartId,
                FoodId: FoodId
            }
        })

        if (targetCart) {
            await targetCart.update({
                quantity: quantity
            })
            res.status(200).send({ message: "updating is success", data : targetCart });
        } else {
            res.status(404).send({ message: 'Cart not found.' })
        }
    } catch (err) {
        console.log(err)
    }
}

const updateTotal = async (req, res) => {
    const targetId = Number(req.params.id)
    const targetCart = await db.Cart.findOne({
        where: {
            id: targetId
        }
    })

    if (targetCart){
        await targetCart.update({
            total: req.body.total
        })
        res.status(200).send({ message: "updating is success", data : targetCart });
    } else {
        res.status(404).send({ message: 'Cart not found.' })
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { CartId, FoodId } = req.params
        const targetCart = await db.Cart_item.findOne({
            where: {
                CartId: CartId,
                FoodId: FoodId
            }
        })

        if (targetCart) {
            await targetCart.destroy()
            res.status(204).send({ message: 'Delete already.' })
        } else {
            res.status(404).send({ message: 'Cart not found.' })
        }
    } catch (err) {
        console.log(err)
    }
}


const getFood = async (req,res) => {
    try {
        const food = await db.Food.findAll({
            include: db.Cart
        })
        res.status(200).send(food)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getCart,
    createCart,
    updateCart,
    deleteCartItem,
    getFood,
    updateTotal
}