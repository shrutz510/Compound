const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const { sequelize, advisors, accounts, securities, holdings } = require('./models');
const apiRoutes = require('./api');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Use API routes
app.use('/api', apiRoutes);

// Load Data from JSON
const loadData = async () => {
    try {
        const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        await sequelize.sync({ force: true });

        await advisors.bulkCreate(data.advisors);
        await accounts.bulkCreate(data.accounts);
        await securities.bulkCreate(data.securities);

        const holdingsData = data.accounts.flatMap(acc =>
            acc.holdings.map(h => ({
                accountId: acc.repId,
                ticker: h.ticker,
                units: h.units,
                unitPrice: h.unitPrice,
            }))
        );

        await holdings.bulkCreate(holdingsData);
        console.log("Data inserted successfully!");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

// Initialize database and start server
sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables recreated!");
    loadData();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
