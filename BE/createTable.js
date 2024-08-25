const { Pool } = require('pg');

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  user: 'postgres',        // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'TL',
  password: 'root',    // Ganti dengan password PostgreSQL Anda
  port: 5432,
});

// Query untuk membuat tabel destinasi
const createDestinasiTableQuery = `
CREATE TABLE IF NOT EXISTS destinasi (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  lokasi VARCHAR(255) NOT NULL,
  harga DECIMAL(10, 2) NOT NULL,
  gambar BYTEA
);
`;

// Query untuk membuat tabel users
const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

// Query untuk membuat tabel bookings
const createBookingsTableQuery = `
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  destination_id INT REFERENCES destinasi(id),
  booking_date DATE NOT NULL
);
`;

const createTables = async () => {
  const client = await pool.connect(); // Ambil koneksi dari pool
  try {
    console.log('Connected to the database');

    // Menjalankan query untuk membuat tabel destinasi
    await client.query(createDestinasiTableQuery);
    console.log('Tabel destinasi berhasil dibuat');

    // Menjalankan query untuk membuat tabel users
    await client.query(createUsersTableQuery);
    console.log('Tabel users berhasil dibuat');

    // Menjalankan query untuk membuat tabel bookings
    await client.query(createBookingsTableQuery);
    console.log('Tabel bookings berhasil dibuat');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.release(); // Kembalikan koneksi ke pool
    await pool.end(); // Tutup pool setelah semua query selesai
  }
};

// Menjalankan fungsi untuk membuat tabel
createTables();
