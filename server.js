const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const sequelize = require('./database');
const { advisors, accounts, securities, holdings } = require('./models'); 
const apiRoutes = require('./api');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Use API routes
app.use('/api', apiRoutes);

// Load Data from JSON and insert into database
const loadData = async () => {
    try {
        const advisorsData = JSON.parse(fs.readFileSync('./data/advisors.json', 'utf8')).advisors;
        const accountsData = JSON.parse(fs.readFileSync('./data/accounts.json', 'utf8')).accounts;
        const securitiesData = JSON.parse(fs.readFileSync('./data/securities.json', 'utf8')).securities;

        await sequelize.sync({ force: true }); // Recreate tables

        if (!advisors || !accounts || !securities || !holdings) {
            throw new Error("One or more models are undefined. Check models/index.js.");
        }

        await advisors.bulkCreate(advisorsData);
        await accounts.bulkCreate(accountsData);
        await securities.bulkCreate(securitiesData);

        // Process holdings from accounts data
        const holdingsData = accountsData.flatMap(acc =>
            acc.holdings.map(h => ({
                accountId: acc.repId,
                ticker: h.ticker,
                units: h.units,
                unitPrice: h.unitPrice,
            }))
        );
        await holdings.bulkCreate(holdingsData);
        console.log("Data inserted successfully!");
    } 
    catch (error) {
        console.error("Error inserting data:", error);
    }
};

// Initialize database and start server
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
        await loadData();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } 
    catch (error) {
        console.error("Server initialization error:", error);
    }
})();
