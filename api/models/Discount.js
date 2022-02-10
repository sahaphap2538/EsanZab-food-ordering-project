module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Discount',{
        code_name : {
            type : DataTypes.STRING,
        },
        quantity : {
            type : DataTypes.INTEGER
        },
        percent : {
            type : DataTypes.STRING,
        },
        max_discount : {
            type : DataTypes.DECIMAL,
        },
        min_total : {
            type : DataTypes.DECIMAL,
        },
        expr : {
            type : DataTypes.DATE,
        },
        status : {
            type : DataTypes.STRING
        }
    },{
        tableName : 'discount',
        timestamps : false
    })

    model.associate = models => {
        model.hasMany(models.Order_payment, {
            foreignKey: "DiscountId"
        })
        model.belongsToMany(models.User, {
            through: models.Discount_item,
            foreignKey: "DiscountId"
        })
    }

    return model
}