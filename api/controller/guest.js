const db = require('../models')

const loginGuests = async (req, res) => {
    const { fname, role } = req.body
    const newGuest = await db.Cart.create({
        total: 0,
        discount: 0,
        User: {
            fname: fname,
            role: role
        }
    }, {
        include: [db.User]
    })
    res.status(201).send(newGuest)
}

module.exports = {
    loginGuests
}