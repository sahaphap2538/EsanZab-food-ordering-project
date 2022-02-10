module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Discount_item',{},{
        tableName : 'discount_item',
        timestamps : false
    })

    return model
}