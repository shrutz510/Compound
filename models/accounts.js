const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const accounts = sequelize.define('accounts', { 
  name: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.STRING, unique: true },
  custodian: { type: DataTypes.STRING, allowNull: false },
  repId: { type: DataTypes.INTEGER, allowNull: false, unique: true } 
}, { schema: 'compound' });

module.exports = accounts;
