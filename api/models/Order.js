module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Order',{
        status : {
            type : DataTypes.STRING,
        },
        table_no : {
            type : DataTypes.INTEGER
        },
        ordered_datetime : {
            type : DataTypes.DATE
        },

    },{
        tableName : 'order',
        timestamps : false
    })

    model.associate = models => {
        model.belongsToMany(models.Food, {
            through: models.Order_item,
            foreignKey: "OrderId"
        })
        model.hasOne(models.Order_payment,{
            foreignKey: "OrderId"
        })
        model.belongsTo(models.User, {
            foreignKey: "UserId"
        })
    }

    return model
}