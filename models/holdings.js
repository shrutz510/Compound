const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const holdings = sequelize.define('holdings', { 
  accountId: { type: DataTypes.INTEGER, allowNull: false },
  ticker: { type: DataTypes.STRING, allowNull: false },
  units: { type: DataTypes.INTEGER, allowNull: false },
  unitPrice: { type: DataTypes.FLOAT, allowNull: false }
}, { schema: 'compound' });

module.exports = holdings;
