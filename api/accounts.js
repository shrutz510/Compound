const express = require('express');
const { accounts } = require('../models');

const router = express.Router();

// Get all accounts
router.get('/', async (_, res) => {
    try {
        const data = await accounts.findAll();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
