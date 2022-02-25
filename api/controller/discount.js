const db = require('../models')

const getDiscount = async (req, res) => {
    try {
        const discount = await db.Discount.findAll()
        res.status(200).send(discount)
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

module.exports = {
    getDiscount,
    updateDiscountQuantity
}