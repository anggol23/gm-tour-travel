// bookingRoutes.js
const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Rute booking yang dilindungi oleh autentikasi
router.get('/booking', authMiddleware.authenticateToken, bookingController.getBooking);
router.post('/booking', authMiddleware.authenticateToken, bookingController.createBooking);
router.put('/booking/:id', authMiddleware.authenticateToken, bookingController.updateBooking);
router.delete('/booking/:id', authMiddleware.authenticateToken, bookingController.deleteBooking);

module.exports = router;
