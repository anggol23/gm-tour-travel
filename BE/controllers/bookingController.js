const pool = require('../config/db');

// Membuat booking baru
exports.createBooking = async (req, res) => {
  try {
    const { destinasiId } = req.body;

    // Ambil userId dari token JWT
    const userId = req.user.id;

    // Lakukan proses penyimpanan booking ke database menggunakan SQL query
    const result = await pool.query(
      'INSERT INTO bookings (user_id, destinasi_id) VALUES ($1, $2) RETURNING *',
      [userId, destinasiId]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Mendapatkan booking berdasarkan pengguna
exports.getBookingByUser = async (req, res) => {
  const userId = req.user.id; // Ambil userId dari req.user
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Server Error');
  }
};

// Mendapatkan semua booking (untuk admin)
exports.getBooking = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Server Error');
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { userId, destinasiId } = req.body;
  try {
    const result = await pool.query(
      'UPDATE bookings SET user_id = $1, destinasi_id = $2 WHERE id = $3 RETURNING *',
      [userId, destinasiId, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).send('Server Error');
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    res.status(200).send('Booking deleted');
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).send('Server Error');
  }
};
