const express = require('express');
const router = express.Router();
const controller = require('../controllers/overall.controller');
const userCheck = require('../controllers/user-check');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Overall Analytics route root path!");
});

router.get('/revnumbers', userCheck, controller.byRevNumbers); 
router.get('/history', userCheck, controller.byArticleHistory); 
router.get('/regusers', userCheck, controller.byRegUsers); 

module.exports = router;