module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define("Cart", {
        total: DataTypes.DECIMAL
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
    }

    return model
}