const express = require('express');
const router = express.Router();
const report = require('../controllers/report');

router.get('/top',report.top);
router.get('/product',report.product);
module.exports = router;