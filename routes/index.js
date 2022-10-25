// made with the help of my peers some code was recycled from class activities
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
