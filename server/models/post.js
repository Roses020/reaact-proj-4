const {sequelize} = require('../util/database')

const {DataTypes} = require('sequelize')

module.exports = {
    post : sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
}