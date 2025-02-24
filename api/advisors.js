const express = require('express');
const { advisors } = require('../models');

const router = express.Router();

// Get all advisors
router.get('/', async (_, res) => {
    try {
        const data = await advisors.findAll();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
