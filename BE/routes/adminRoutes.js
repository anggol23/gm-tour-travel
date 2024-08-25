// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../multerConfig'); // Pastikan path ini benar

// Destinasi routes
router.get('/destinasi', adminController.getDestinasi);
router.post('/destinasi', adminController.createDestinasi);
router.put('/destinasi/:id', adminController.updateDestinasi);
router.delete('/destinasi/:id', adminController.deleteDestinasi);

module.exports = router;
