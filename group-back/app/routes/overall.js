const express = require('express');
const router = express.Router();
const controller = require('../controllers/overall.controller');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Overall Analytics route root path!");
});

router.get('/revnumbers', controller.byRevNumbers); 
router.get('/history', controller.byArticleHistory); 
router.get('/regusers', controller.byRegUsers); 

module.exports = router;