const sequelize = require('../database'); 
const advisors = require('./advisors');
const accounts = require('./accounts');
const securities = require('./securities');
const holdings = require('./holdings');

// Define relationships
accounts.hasMany(holdings, { foreignKey: 'accountId', sourceKey: 'repId' });
holdings.belongsTo(accounts, { foreignKey: 'accountId', targetKey: 'repId' });

module.exports = { sequelize, advisors, accounts, securities, holdings };
