const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const securities = sequelize.define('securities', { 
  id: { type: DataTypes.UUID, primaryKey: true },
  ticker: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  dateAdded: { type: DataTypes.DATE, allowNull: false }
}, { schema: 'compound' });

module.exports = securities;
