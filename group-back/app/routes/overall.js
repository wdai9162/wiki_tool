const express = require('express');
const router = express.Router();
const controller = require('../controllers/overall.controller');
const userCheck = require('../middleware/user-check');

router.get('', (req, res, next) => {
  res.status(200).end("This is the Overall Analytics route root path!");
});


router.get('/revnumbers', controller.byRevNumbers); 
router.get('/history', controller.byArticleHistory); 
router.get('/regusers', controller.byRegUsers); 
router.get('/anonusersdata', controller.anonUserByYear); 
router.get('/botusersdata', controller.botUserByYear); 
router.get('/adminusersdata', controller.adminUserByYear); 
router.get('/regusersdata', controller.regUserByYear); 
router.get('/graphdata', controller.graphData); 

module.exports = router;
