const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URI, { dialect: 'postgres', logging: false });

// Ensure the correct schema
sequelize.query('CREATE SCHEMA IF NOT EXISTS compound;');

// Set schema for all models
const advisors = sequelize.define('advisors', { 
  name: { type: DataTypes.STRING, allowNull: false } 
}, { schema: 'compound' });

const accounts = sequelize.define('accounts', { 
    name: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, unique: true },
    custodian: { type: DataTypes.STRING, allowNull: false },
    repId: { type: DataTypes.INTEGER, allowNull: false, unique: true } 
  }, { schema: 'compound' });  

const securities = sequelize.define('securities', { 
  id: { type: DataTypes.UUID, primaryKey: true },
  ticker: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  dateAdded: { type: DataTypes.DATE, allowNull: false }
}, { schema: 'compound' });

const holdings = sequelize.define('holdings', { 
  accountId: { type: DataTypes.INTEGER, allowNull: false },
  ticker: { type: DataTypes.STRING, allowNull: false },
  units: { type: DataTypes.INTEGER, allowNull: false },
  unitPrice: { type: DataTypes.FLOAT, allowNull: false }
}, { schema: 'compound' });

// Define relationships
accounts.hasMany(holdings, { foreignKey: 'accountId', sourceKey: 'repId' });
holdings.belongsTo(accounts, { foreignKey: 'accountId', targetKey: 'repId' });

module.exports = { sequelize, advisors, accounts, securities, holdings };
