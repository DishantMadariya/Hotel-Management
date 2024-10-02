const express = require('express');
const router = express.Router();
const reservationcontroller = require('../controllers/reservationcontroller');
const { middleware } = require('../config/middleware');
router.post('/create', middleware, reservationcontroller.insert);
module.exports = router;