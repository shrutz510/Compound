const express = require('express');

const advisorsRoutes = require('./advisors');
const accountsRoutes = require('./accounts');
const securitiesRoutes = require('./securities');
const holdingsRoutes = require('./holdings');
const insightsRoutes = require('./insights');

const router = express.Router();

router.use('/advisors', advisorsRoutes);
router.use('/accounts', accountsRoutes);
router.use('/securities', securitiesRoutes);
router.use('/holdings', holdingsRoutes);
router.use('/insights', insightsRoutes);

module.exports = router;
