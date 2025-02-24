const express = require('express');
const { sequelize, holdings, accounts } = require('../models');

const router = express.Router();

// Total value of all accounts
router.get('/total-value', async (req, res) => {
    try {
        const totalValue = await holdings.findOne({
            attributes: [[sequelize.fn('SUM', sequelize.literal('"units" * "unitPrice"')), 'totalValue']],
        });
        res.json({
            totalValue: Number(totalValue.getDataValue('totalValue') || 0).toFixed(2),
        });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Top 5 securities held
router.get('/top-securities', async (req, res) => {
    try {
        const topSecurities = await holdings.findAll({
            attributes: ['ticker', [sequelize.fn('SUM', sequelize.col('units')), '"totalUnits"']],  
            group: ['ticker'],
            order: [[sequelize.literal('"totalUnits"'), 'DESC']], 
            limit: 5,
        });
        res.json(topSecurities);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// advisors rankings by custodian
router.get('/advisor-rankings', async (req, res) => {
    try {
        const rankings = await accounts.findAll({
            attributes: [
                'id',
                'name',
                'custodian',
                'repId',
                [sequelize.fn('SUM', sequelize.literal('"holdings"."units" * "holdings"."unitPrice"')), '"totalAssets"']
            ],
            include: [{ model: holdings, attributes: [] }],
            group: ['accounts.id', 'accounts.name', 'accounts.custodian', 'accounts.repId'],
            order: [[sequelize.literal('"totalAssets"'), 'DESC']],
        });
        res.json(rankings);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
