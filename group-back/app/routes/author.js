const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');

router.get('', (req, res, next) => {
    res.status(200).end("This is the author management route root path!");
});

router.post('/returnAuthorNames', controller.returnAuthorNames);
router.post('/returnAllAuthorNames', controller.returnAllAuthorNames);
router.post('/returnAuthorArticle', controller.returnAuthorArticle);
router.post('/returnAuthorArticleNum', controller.returnAuthorArticleNum);
router.post('/returnArticleTimestamps', controller.returnArticleTimestamps);
module.exports = router;
