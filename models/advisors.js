const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const advisors = sequelize.define('advisors', { 
  name: { type: DataTypes.STRING, allowNull: false } 
}, { schema: 'compound' });

module.exports = advisors;
