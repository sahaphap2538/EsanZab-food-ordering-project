module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Order_item',{
        quantity : {
            type : DataTypes.INTEGER
        },
    },{
        tableName : 'order_item',
        timestamps : false
    })

    return model
}