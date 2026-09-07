const { Sequialize } = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: `${process.env.DATABASE_NAME}`.sqlite
})
