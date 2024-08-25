import { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi untuk mengambil data booking
  const fetchBookings = async () => {
    setLoading(true);
    const token = localStorage.getItem('token'); // Ambil token dari localStorage

    try {
      const response = await axios.get('http://localhost:7000/api/user/booking', {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      });
      setBookings(response.data);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Failed to fetch bookings. Please try again later.');
      } else {
        setError('Failed to fetch bookings. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghapus booking
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:7000/api/user/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
      setShowAlert(true);
      setAlertMessage('Booking successfully deleted!');
    } catch (error) {
      setShowAlert(true);
      setAlertMessage('Failed to delete booking. Please try again later.');
    }
  };

  // Fungsi untuk memperbarui status booking
  const handleUpdateStatus = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:7000/api/user/booking/${id}`, { status: 'Updated' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBookings();
      setShowAlert(true);
      setAlertMessage('Booking status successfully updated!');
    } catch (error) {
      setShowAlert(true);
      setAlertMessage('Failed to update booking status. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Bookings</h2>

      {showAlert && (
        <Alert variant={error ? 'danger' : 'success'} onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Pengguna</th>
              <th>Destinasi</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.destinationName}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    <Button
                      variant="success"
                      className="mr-2"
                      onClick={() => handleUpdateStatus(booking.id)}
                    >
                      Ubah Status
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(booking.id)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No bookings available</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Booking;
