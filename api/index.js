const express = require('express')
const app = express()
const cors = require('cors')
const db = require("./models")
const cookieSession = require('cookie-session')
const passport = require('passport')
const jwtAuthenication = passport.authenticate('jwt', { session: false })

const userRoutes = require('./routes/user')
const authRoutes = require("./routes/auth")
const manageMenuRoutes = require('./routes/manageMenu')
const guestRoutes = require('./routes/guest')
const cartRoutes = require('./routes/cart')
const OrderRoutes = require('./routes/order')


require('dotenv').config()
require('./config/passport/passport-jwt')
require('./config/passport/passport-facebook')

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 3600
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/guest', guestRoutes)
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/manage_menu', manageMenuRoutes)
app.use('/cart', cartRoutes)
app.use('/order', OrderRoutes)

db.sequelize.sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is runnig at port ${process.env.PORT}`)
        })
    })
