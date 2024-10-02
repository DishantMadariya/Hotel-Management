const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const { middleware } = require('../config/middleware');
router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.use('/listning', middleware, require('./listning'));
module.exports = router;