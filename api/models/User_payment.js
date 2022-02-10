module.exports = (Sequelize, DataTypes) => {
    const model = Sequelize.define('User_payment',{
        payment_type : {
            type : DataTypes.STRING,
        },
        provider : {
            type : DataTypes.STRING
        },
        account_no : {
            type : DataTypes.INTEGER
        },
    },{
        tableName : 'user_payment',
        timestamps : false
    })

    model.associate = models => {
        model.belongsTo(models.User, {
            foreignKey: "UserId"
        })
    }

    return model
}