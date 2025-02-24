const { Sequelize } = require('sequelize');
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const DB_NAME = 'compound_dev';
const DB_USER = process.env.DB_USER || 'postgres'; // Update with your PostgreSQL username
const DB_PASS = process.env.DB_PASS || 'compound'; // Update with your PostgreSQL password
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_URI = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Create a temporary connection to check if the database exists
const client = new Client({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: 'postgres',
});

const ensureDatabaseExists = async () => {
  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}';`);

    if (res.rowCount === 0) {
      console.log(`Database "${DB_NAME}" does not exist. Creating now...`);
      await client.query(`CREATE DATABASE ${DB_NAME};`);
      console.log(`Database "${DB_NAME}" created successfully.`);
    } 
    else {
      console.log(`Database "${DB_NAME}" already exists.`);
    }
  } 
  catch (error) {
    console.error('Error checking/creating database:', error);
  } 
  finally {
    await client.end();
  }
};

const sequelize = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: false,
});

const initializeDatabase = async () => {
  // Ensure DB exists before connecting
  await ensureDatabaseExists(); 

  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    // Ensure schema exists
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS compound;');
    console.log('Schema "compound" ensured.');
  } 
  catch (error) {
    console.error('Database connection error:', error);
  }
};

initializeDatabase();

module.exports = sequelize;
