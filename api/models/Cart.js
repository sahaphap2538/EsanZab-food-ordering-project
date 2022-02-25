module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define("Cart", {
        total : {
            type : DataTypes.DECIMAL
        },
        discount : {
            type : DataTypes.DECIMAL
        },
    },{
        tableName : 'cart',
        timestamps : false
    })

    model.associate = models => {
        model.belongsToMany(models.Food, {
            through: models.Cart_item,
            foreignKey: "CartId"
        })
        model.belongsTo(models.User, {
            foreignKey: "UserId"
        })
        model.belongsTo(models.Discount, {
            foreignKey: "DiscountId"
        })
    }

    return model
}