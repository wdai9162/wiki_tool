const express = require('express');
const router = express.Router();
const controller = require('../controllers/individual.controller');
const userCheck = require('../middleware/user-check');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Individual Analytics route root path!");
});

router.get('/getlist', controller.articleList); 
router.get('/checkdate', controller.checkUptoDate); 

module.exports = router;