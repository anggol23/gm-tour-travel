const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const upload = require('./multerConfig.js');

const app = express();

// Middleware setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'] // URL frontend Anda
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Serve images

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Route setup
app.use('/api/admin', upload.single('gambar'), adminRoutes); // Menambahkan upload.single('gambar')
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/user', userRoutes); // User routes
app.use('/api/user', bookingRoutes); // Rute booking dipisah dari user untuk kejelasan

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
