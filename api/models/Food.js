module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('Food',{
        name : {
            type : DataTypes.STRING,
        },
        price : {
            type : DataTypes.DECIMAL
        },
        picture : {
            type : DataTypes.STRING
        },
        cloudinary_id : {
            type : DataTypes.STRING
        },
        category : {
            type : DataTypes.STRING
        },
        status : {
            type : DataTypes.STRING
        },

    },{
        tableName : 'food',
        timestamps : false
    })

    model.associate = models => {
        model.belongsToMany(models.Cart, {
            through: models.Cart_item,
            foreignKey: "FoodId"
        })
        model.belongsToMany(models.Order, {
            through: models.Order_item,
            foreignKey: "FoodId"
        })
    }

    return model
}