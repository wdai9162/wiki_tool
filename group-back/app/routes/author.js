const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');
const userCheck = require('../middleware/user-check');

router.get('', (req, res, next) => {
    res.status(200).end("This is the author management route root path!");
});

router.post('/returnAuthorNames',userCheck, controller.returnAuthorNames);
router.post('/returnAllAuthorNames',userCheck, controller.returnAllAuthorNames);
router.post('/returnAuthorArticleAndNum',userCheck, controller.returnAuthorArticleAndNum);
router.post('/returnArticleTimestamps',userCheck, controller.returnArticleTimestamps);
router.post('/returnAuthorArticleAndNumNew',userCheck, controller.returnTitleAndNumber);
module.exports = router;
