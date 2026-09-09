const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: `./src/database/${process.env.DATABASE_NAME}.sqlite`
})

module.exports = db;