const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { register, login } = require('../controllers/authController');

// Rute untuk pengguna
router.get('/', userController.getUsers); // Rute ini akan menangani GET /api/users
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/destinasi', userController.getDestinasi); // Didefinisikan di userController
router.post('/booking', userController.createBooking); // Didefinisikan di userController
router.post('/register', register);
router.post('/login', login);

module.exports = router;
