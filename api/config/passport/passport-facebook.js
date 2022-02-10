const passport = require('passport')
const { Strategy } = require('passport-facebook')
const db = require('../../models')

const option = {
    clientID: process.env.FACEBOOK_CLIENTID ,
    clientSecret: process.env.FACEBOOK_CLIENTSECRET ,
    callbackURL: 'http://localhost:3000/menu',
    profileFields: ['id', 'displayName', 'email', 'first_name','last_name','gender','birthday'],
    passReqToCallback: true,
}

const facebookStrategy = new Strategy(option, async (accessToken, refreshToken, profile, done) => {
    const targetUser = await db.User.findOne({
        where: {
            username: profile.displayName
        },
    })

    if (tagetUser) {
        done(null,targetUser )
    } else {
        const newUser = await db.Cart.create({
            total: 0,
            User: {
                username: profile.displayName,
                password: profile.id,
                fname: profile.name.displayName,
                lname: profile.name.displayName,
                gender: profile.gender,
                birthday: profile.birthday,
                points: 0,
                role: 'user'
            }
        }, {
            include: [db.User]
        })

        done(null, newUser)
    }
})

passport.use('facebook', facebookStrategy)

passport.serializeUser((user,done) => {
    done(null, user)
})

passport.deserializeUser((obj,done) => {
    done(null, obj)
})