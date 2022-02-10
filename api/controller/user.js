const db = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { username, password, fname, lname, gender, birthday, points, role } = req.body
    const targetUser = await db.User.findOne({
        where: {
            username: username
        }
    })
    if (targetUser) {
        res.status(400).send({ message: 'มีชื่อผู้ใช้งานนี้แล้วกรุณาลองใหม่' })
    } else {
        const salt = bcryptjs.genSaltSync(12)
        const hashPassword = bcryptjs.hashSync(password, salt)
        const newUser = await db.Cart.create({
            total: 0,
            User: {
                username: username,
                password: hashPassword,
                fname: fname,
                lname: lname,
                gender: gender,
                birthday: birthday,
                points: points,
                role: role
            }
        }, {
            include: [db.User]
        })

        res.status(201).send({ message: `ลงทะเบียนสำเร็จ!ยินดีต้อนรับคุณ ${newUser.User.fname}` })
    }
}

const loginUser = async (req, res) => {
    const { username, password, role } = req.body
    const targetUser = await db.User.findOne({
        where: {
            username: username,
            role: role
        }
    })
    if (!targetUser) {
        res.status(400).send()
    } else {
        const isCorrectPassword = bcryptjs.compareSync(password, targetUser.password)
        if (isCorrectPassword) {
            const payload = {
                id: targetUser.id,
                name: targetUser.fname,
                role: targetUser.role
            }
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: 3600 })

            res.status(200).send({
                token: token,
                message: `EsanZabยินดีตอนรับคุณ ${targetUser.fname}`
            })
        }
        else {
            res.status(400).send()
        }
    }
}

module.exports = {
    registerUser,
    loginUser
}
