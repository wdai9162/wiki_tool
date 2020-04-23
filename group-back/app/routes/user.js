const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('', (req, res, next) => {
    res.status(200).end("This is the user management route root path!");
  });

router.post('/login', controller.login);
router.post('/signup', controller.signup);
//router.get('/logout', controller.);

module.exports = router;
