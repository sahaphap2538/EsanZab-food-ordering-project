module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Discount_item',{
        quantity : {
            type : DataTypes.INTEGER,
        },
    },{
        tableName : 'discount_item',
        timestamps : false
    })

    return model
}