const db = require('../models')

const getOrder = async (req, res) => {
    try {
        const order = await db.Order_payment.findAll({
            include: {
                model: db.Order,
                include: [db.Food, db.User]
            }
        })
        res.status(200).send(order)
    } catch (err) {
        console.log(err)
    }
}

const createOrder = async (req, res) => {
    const { pay_method, total, table_no, ordered_datetime, UserId, Food, discount, DiscountId } = req.body
    try {
        const newOrder = await db.Order_payment.create({
            pay_method: pay_method,
            discount: discount,
            total: total,
            DiscountId: DiscountId,
            Order: {
                status: 'ordered',
                table_no: table_no,
                ordered_datetime: ordered_datetime,
                UserId: UserId
            }
        }, {
            include: [db.Order]
        })

        const orderItem = Food.map(async (item) => (
            await db.Order_item.create({
                quantity: item.Cart_item.quantity,
                FoodId: item.id,
                OrderId: newOrder.dataValues.OrderId
            })
        ))
        res.status(201).send({ newOrder, orderItem })
    } catch (err) {
        console.log(err)
    }

}

const updateOrderStatus = async (req, res) => {
    try {
        const targetId = Number(req.params.id)
        const targetOrder = await db.Order.findOne({
            where: {
                id: targetId
            }
        })

        if (targetOrder) {
            await targetOrder.update({
                status: req.body.status
            })
            res.status(200).send({ message: "updating is success", data: targetOrder });
        } else {
            res.status(404).send({ message: 'Order not found.' })
        }

    } catch (err) {
        console.log(err)
    }

}


module.exports = {
    createOrder,
    getOrder,
    updateOrderStatus
}