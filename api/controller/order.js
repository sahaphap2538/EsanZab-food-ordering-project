const db = require('../models')

const createOrder = async (req, res) => {
    const { pay_method, total, table_no, ordered_datetime, UserId, Food } = req.body
    try {
        const newOrder = await db.Order_payment.create({
            pay_method: pay_method,
            discount: 0,
            total: total,
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
        res.status(201).send({newOrder, orderItem})
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    createOrder
}