module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Cart_item',{
        quantity : {
            type : DataTypes.INTEGER,
        }
    },{
        tableName: 'cart_item',
        timestamps : false
    })
    
    return model
}