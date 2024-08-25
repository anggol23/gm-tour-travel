const pool = require('../config/db'); // Pastikan ini sudah terhubung dengan benar

// Fungsi untuk mendapatkan destinasi
exports.getDestinasi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinasi');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).send('Server Error');
  }
};

// Fungsi untuk membuat booking
exports.createBooking = async (req, res) => {
  const { userId, destinasiId, bookingDate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bookings (user_id, destinasi_id, booking_date) VALUES ($1, $2, $3) RETURNING *',
      [userId, destinasiId, bookingDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Server Error');
  }
};

// Mengambil semua pengguna
exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
};

// Menambah pengguna baru
exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [name, email, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

// Mengupdate pengguna yang ada
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [name, email, role, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
};

// Menghapus pengguna
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
