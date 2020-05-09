const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');

router.get('', (req, res, next) => {
    res.status(200).end("This is the author management route root path!");
});

router.get('/returnAuthorNames', controller.returnAuthorNames);
router.get('/returnAllAuthorNames', controller.returnAllAuthorNames);
router.get('/returnAuthorArticle', controller.returnAuthorArticle);
router.get('/returnAuthorArticleNum', controller.returnAuthorArticleNum);
router.get('/returnArticleTimestamps', controller.returnArticleTimestamps);
module.exports = router;
