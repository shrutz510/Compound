const express = require('express');
const { sequelize, advisors, accounts, securities, holdings } = require('./models');

const router = express.Router();

// Get all advisors
router.get('/advisors', async (_, res) => {
    try {
        const data = await advisors.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all accounts
router.get('/accounts', async (_, res) => {
    try {
        const data = await accounts.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all securities
router.get('/securities', async (_, res) => {
    try {
        const data = await securities.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Total value of all accounts
router.get('/insights/total-value', async (req, res) => {
    try {
        const totalValue = await holdings.findOne({
            attributes: [[sequelize.fn('SUM', sequelize.literal('"units" * "unitPrice"')), 'totalValue']],
        });
        res.json({
            totalValue: Number(totalValue.getDataValue('totalValue')).toFixed(2),
        });        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Top 5 securities held
router.get('/insights/top-securities', async (req, res) => {
    try {
        const topSecurities = await holdings.findAll({
            attributes: ['ticker', [sequelize.fn('SUM', sequelize.col('units')), 'totalUnits']],
            group: ['ticker'],
            order: [[sequelize.literal('"totalUnits" DESC')]],
            limit: 5,
        });
        res.json(topSecurities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Advisor rankings by custodian
router.get('/insights/advisor-rankings', async (req, res) => {
    try {
        const rankings = await accounts.findAll({
            attributes: [
                'id',
                'name',
                'custodian',
                'repId',
                [sequelize.fn('SUM', sequelize.literal('"holdings"."units" * "holdings"."unitPrice"')), 'totalAssets']
            ],
            include: [{ model: holdings, attributes: [] }],
            group: ['accounts.id', 'accounts.name', 'accounts.custodian', 'accounts.repId'],
            order: [[sequelize.literal('"totalAssets" DESC')]],
        });

        res.json(rankings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
