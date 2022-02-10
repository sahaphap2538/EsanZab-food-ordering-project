module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Order_payment',{
        pay_method : {
            type : DataTypes.STRING,
        },
        discount : {
            type : DataTypes.DECIMAL
        },
        total : {
            type : DataTypes.DECIMAL
        },
    },{
        tableName : 'order_payment',
        timestamps : false
    })

    model.associate = models => {
        model.belongsTo(models.Discount, {
            foreignKey: "DiscountId"
        })
        model.belongsTo(models.Order, {
            foreignKey: "OrderId"
        })
    }

    return model
}
