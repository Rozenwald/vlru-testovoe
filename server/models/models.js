const sequelize = require('../config/db.config')
const { DataTypes } = require('sequelize')

const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  priority: { type: DataTypes.ARRAY(DataTypes.STRING, DataTypes.ARRAY), allowNull:false },
  marks: { type: DataTypes.ARRAY(DataTypes.STRING, DataTypes.ARRAY), allowNull:false  },
  description: { type: DataTypes.TEXT },
})

module.exports = {
  Task,
}