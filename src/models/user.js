const { DataTypes, Model } = require('sequelize')
const db = require('../config/database.js')

class User extends Model {
    static id
    static userName
    static email
    static password
    static phone
}

User.init({
    userName: {
        type: DataTypes.String,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.String,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.String,
        allowNull: false
    },
    phone: {
        type: DataTypes.String,
        allowNull: true,
        unique: true
    }
}, {
    sequelize: db,
    modelName: 'User',
    tableName: 'user',
    timeStamps: true
})

User.prototype.toJSON = function () {
    const { password, ...user} = this.get()
    delete user.password
    return user
}

module.exports = User