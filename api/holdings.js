const express = require('express');
const { holdings } = require('../models');

const router = express.Router();

// Get all holdings
router.get('/', async (_, res) => {
    try {
        const data = await holdings.findAll();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
