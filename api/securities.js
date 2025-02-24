const express = require('express');
const { securities } = require('../models');

const router = express.Router();

// Get all securities
router.get('/', async (_, res) => {
    try {
        const data = await securities.findAll();
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
