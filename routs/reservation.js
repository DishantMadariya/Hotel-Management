const express = require('express');
const router = express.Router();
const reservationcontroller = require('../controllers/reservationcontroller');
router.post('/create', reservationcontroller.insert);
router.get('/viewReservation', reservationcontroller.viewReservation);
router.post('/editreserv/:id', reservationcontroller.editreservation);
router.delete('/deleteReserv/:id', reservationcontroller.deleteReservation);
module.exports = router;