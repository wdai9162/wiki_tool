const express = require('express');
const router = express.Router();
const controller = require('../controllers/overall.controller');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Overall Analytics route root path!");
});

router.get('/overallstats', controller.sendOverallStats); 
router.get('/barchartdata', controller.sendBarChartData); 
router.get('/peichartdata', controller.sendPieChartData); 

module.exports = router;