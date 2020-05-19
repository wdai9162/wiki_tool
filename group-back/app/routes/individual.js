const express = require('express');
const router = express.Router();
const controller = require('../controllers/individual.controller');
const userCheck = require('../middleware/user-check');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Individual Analytics route root path!");
});

router.get('/getlist',userCheck, controller.articleList); 
router.get('/checkdateandupdate',userCheck, controller.checkDateAndUpdate); 
router.get('/reguserbyrevnumber',userCheck, controller.regUserByRevNumber); 
router.get('/getredditnews',userCheck, controller.getNewsReddit); 
router.get('/graphdata',userCheck, controller.graphData); 
router.get('/topusergraphdata',userCheck, controller.topUserGraph); 

module.exports = router;