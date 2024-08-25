const { Pool } = require('pg');
const getFileURL = require('../utils/getFileURL');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TL',
  password: 'root',
  port: 5432,
});

// Fungsi untuk mendapatkan semua destinasi
const getDestinasi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destinasi');
    const response = result.rows.map(e => ({
      ...e,
      gambar: e?.gambar ? getFileURL(req, e.gambar) : null,
    }));
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching destinations:', error); // Tambahkan log error
    res.status(500).json({ message: 'Error fetching destinations', error });
  }
};

// Fungsi untuk membuat destinasi baru
const createDestinasi = async (req, res) => {
  const { nama, lokasi, harga } = req.body;
  const filePath = req?.file?.path
  const splittedFilePath = filePath ? filePath.split('\\') : null
  const gambar = splittedFilePath ? splittedFilePath[splittedFilePath.length - 1] : null // Mendapatkan path gambar dari upload

  // Validasi input
  if (!nama || !lokasi || !harga) {
    return res.status(400).json({ error: 'Nama, lokasi, dan harga harus diisi' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO destinasi (nama, lokasi, harga, gambar) VALUES ($1, $2, $3, $4) RETURNING *',
      [nama, lokasi, harga, gambar]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating destination:', error); // Tambahkan log error
    res.status(500).json({ message: 'Error creating destination', error });
  }
};

// Fungsi untuk memperbarui destinasi
const updateDestinasi = async (req, res) => {
  const { id } = req.params;
  const { nama, lokasi, harga } = req.body;
  const filePath = req?.file?.path
  const splittedFilePath = filePath ? filePath.split('\\') : null
  const gambar = splittedFilePath ? splittedFilePath[splittedFilePath.length - 1] : null // Mendapatkan path gambar dari upload

  console.log('Received data:', { nama, lokasi, harga, gambar });

  // Validasi input
  if (!nama || !lokasi || !harga) {
    return res.status(400).json({ error: 'Nama, lokasi, dan harga harus diisi' });
  }

  try {
    const result = await pool.query(
      'UPDATE destinasi SET nama = $1, lokasi = $2, harga = $3, gambar = $4 WHERE id = $5 RETURNING *',
      [nama, lokasi, harga, gambar, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating destinasi:', error); // Tambahkan log error
    res.status(500).json({ error: 'Internal Server Error', details: error });
  }
};

// Fungsi untuk menghapus destinasi
const deleteDestinasi = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await pool.query('DELETE FROM destinasi WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Destinasi tidak ditemukan' });
    }
    res.json({ message: 'Destinasi deleted' });
  } catch (error) {
    console.error('Error deleting destinasi:', error); // Tambahkan log error
    res.status(500).json({ message: 'Error deleting destination', error });
  }
};

module.exports = {
  getDestinasi,
  createDestinasi,
  updateDestinasi,
  deleteDestinasi
};
