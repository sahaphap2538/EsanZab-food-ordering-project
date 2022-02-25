module.exports = (Sequelize, Datatypes) => {
    const model = Sequelize.define('User', {
        username: {
            type: Datatypes.STRING
        },
        password:{
            type: Datatypes.STRING
        },
        fname: {
            type: Datatypes.STRING
        },
        lname: {
            type: Datatypes.STRING
        },
        gender: {
            type: Datatypes.STRING
        },
        birthday: {
            type: Datatypes.STRING
        },
        points: {
            type: Datatypes.INTEGER
        },
        role: {
            type: Datatypes.STRING
        }
    },{
        tableName: "user",
        timestamps: false
    })

    model.associate = models => {
        model.hasOne(models.Cart, {
            foreignKey: "UserId"
        })
        model.belongsToMany(models.Discount, {
            through: models.Discount_item,
            foreignKey: "UserId"
        })
        model.hasMany(models.Order, {
            foreignKey: "UserId"
        })
    }

    return model
}