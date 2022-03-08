const db = require('../models')

const getDiscount = async (req, res) => {
    try {
        const discount = await db.Discount.findAll()
        res.status(200).send(discount)
    } catch (err) {
        console.log(err)
    }
}

const getDiscountItem = async (req, res) => {
    try {
        const discountItem = await db.User.findAll({
            include: db.Discount
        })
        res.status(200).send(discountItem)
    } catch (err) {
        console.log(err)
    }
}


const updateDiscountQuantity = async (req, res) => {
    const targetId = Number(req.params.id)
    const targetDiscount = await db.Discount.findOne({
        where: {
            id: targetId
        }
    })

    if (targetDiscount){
        await targetDiscount.update({
            quantity: req.body.quantity
        })
        res.status(200).send({ message: "updating is success", data : targetDiscount });
    } else {
        res.status(404).send({ message: 'Cart not found.' })
    }
}

const updateDiscountItemQuntity = async(req, res) => {
    try {
        const { DiscountId, UserId } = req.params
        const targetItem = await db.Discount_item.findOne({
            where: {
                DiscountId: DiscountId,
                UserId: UserId
            }
        })

        if (targetItem) {
            await targetItem.update({
                quantity: req.body.quantity
            })
            res.status(200).send({ message: "updating is success", data : targetItem });
        } else {
            res.status(404).send({ message: 'Cart not found.' })
        }
    } catch (err) {
        console.log(err)
    }
}

const createDiscountItem = async (req, res) => {
    try {
        const { DiscountId, UserId, quantity } = req.body
        const newDiscount = await db.Discount_item.create({
            DiscountId:  DiscountId,
            UserId: UserId,
            quantity: quantity
        })
            
        res.status(201).send(newDiscount)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getDiscount,
    updateDiscountQuantity,
    createDiscountItem,
    getDiscountItem,
    updateDiscountItemQuntity
}