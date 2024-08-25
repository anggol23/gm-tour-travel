import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Destinasi = () => {
  const [destinasiList, setDestinasiList] = useState([]);
  const [show, setShow] = useState(false);
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState(null);
  const [editingDestinasiId, setEditingDestinasiId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinasi();
  }, []);

  const fetchDestinasi = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/admin/destinasi');
      if (Array.isArray(response.data)) {
        setDestinasiList(response.data);
        setError(null);
      } else {
        setDestinasiList([]);
        setError('Data dari API tidak sesuai format');
      }
    } catch (error) {
      console.error('Error fetching destinasi:', error);
      setDestinasiList([]);
      setError('Terjadi kesalahan saat memuat data');
    }
  };

  const handleClose = () => {
    setShow(false);
    setNama('');
    setLokasi('');
    setHarga('');
    setGambar(null);
    setEditingDestinasiId(null);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('lokasi', lokasi);
    formData.append('harga', harga);
    if (gambar) formData.append('gambar', gambar); // Hanya kirim gambar jika ada

    try {
      if (editingDestinasiId) {
        await axios.put(`http://localhost:7000/api/admin/destinasi/${editingDestinasiId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:7000/api/admin/destinasi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchDestinasi();
      handleClose();
    } catch (error) {
      console.error('Error saving destinasi:', error);
      setError('Terjadi kesalahan saat menyimpan destinasi');
    }
  };

  const handleEdit = (destinasi) => {
    setEditingDestinasiId(destinasi.id);
    setNama(destinasi.nama);
    setLokasi(destinasi.lokasi);
    setHarga(destinasi.harga);
    setGambar(destinasi.gambar)
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/admin/destinasi/${id}`);
      fetchDestinasi();
    } catch (error) {
      console.error('Error deleting destinasi:', error);
      setError('Terjadi kesalahan saat menghapus destinasi');
    }
  };

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <Button variant="primary" onClick={handleShow}>
        Tambah Destinasi
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Lokasi</th>
            <th>Harga</th>
            <th>Gambar</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {destinasiList.length > 0 ? (
            destinasiList.map((destinasi, index) => (
              <tr key={destinasi.id}>
                <td>{index + 1}</td>
                <td>{destinasi.nama}</td>
                <td>{destinasi.lokasi}</td>
                <td>{destinasi.harga}</td>
                <td>
                  {destinasi.gambar && (
                    <img
                      src={`http://localhost:7000${destinasi.gambar}`}
                      alt={destinasi.nama}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </td>
                <td>
                  <Button variant="warning" className="mr-2" onClick={() => handleEdit(destinasi)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(destinasi.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingDestinasiId ? 'Edit Destinasi' : 'Tambah Destinasi'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama destinasi"
                required
              />
            </Form.Group>

            <Form.Group controlId="formLokasi">
              <Form.Label>Lokasi</Form.Label>
              <Form.Control
                type="text"
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                placeholder="Masukkan lokasi destinasi"
                required
              />
            </Form.Group>

            <Form.Group controlId="formHarga">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Masukkan harga destinasi"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGambar">
              <Form.Label>Gambar</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setGambar(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editingDestinasiId ? 'Update Destinasi' : 'Tambah Destinasi'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Destinasi;
