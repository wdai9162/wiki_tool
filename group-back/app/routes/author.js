const express = require('express');
const router = express.Router();
const controller = require('../controllers/author.controller');

router.get('', (req, res, next) => {
    res.status(200).end("This is the author management route root path!");
});

router.post('/returnAuthorNames', controller.returnAuthorNames);

module.exports = router;
