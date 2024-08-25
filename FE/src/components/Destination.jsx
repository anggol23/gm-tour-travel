import { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Container, Modal, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Import file CSS
import { AuthContext } from '../AuthContext'; // Import context auth

function Destination() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State for alert
  const [alertMessage, setAlertMessage] = useState('');
  const [bookedDestinations, setBookedDestinations] = useState([]); // State for booked destinations

  const { isLoggedIn, logout } = useContext(AuthContext); // Mengambil status login dan fungsi logout dari AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/admin/destinasi');
        setDestinations(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const fetchBookedDestinations = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get('http://localhost:7000/api/user/booking', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
          });
          setBookedDestinations(response.data.map(booking => booking.destinasiId)); // Asumsi response.data adalah array objek booking
        } catch (error) {
          console.error('Error fetching booked destinations:', error);
        }
      }
    };

    fetchBookedDestinations();
  }, [isLoggedIn]);

  const handleShowDetail = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleBookingClick = () => {
    if (!isLoggedIn) {
      // Jika belum login, arahkan ke halaman login dengan menyimpan state destinasi
      navigate('/login', { state: { from: '/destinasi', destination: selectedDestination } });
    } else {
      // Jika sudah login, lakukan pemesanan
      bookDestination();
    }
  };

  const bookDestination = async () => {
    try {
      const response = await axios.post('http://localhost:7000/api/user/booking', {
        destinasiId: selectedDestination.id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200) {
        setShowAlert(true);
        setAlertMessage('Booking successful!');
        setBookedDestinations([...bookedDestinations, selectedDestination.id]); // Tambahkan destinasi yang dibooking
        navigate(`/destination?bookingSuccess=true`); // Redirect ke halaman destinasi dengan query bookingSuccess
      }
    } catch (error) {
      console.error('Error booking destination:', error);
    }
  };

  const handleLogout = () => {
    logout(); // Panggil fungsi logout dari AuthContext
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  useEffect(() => {
    // Memeriksa jika ada query bookingSuccess
    if (window.location.search.includes('bookingSuccess=true')) {
      setShowAlert(true);
      setAlertMessage('Booking successful!');
    }
  }, []);

  if (loading) return <Container><h2 className="text-center">Loading...</h2></Container>;
  if (error) return <Container><h2 className="text-center">{error}</h2></Container>;

  return (
    <Container>
      <h2 className="text-center">Destination</h2>
      {showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
      {isLoggedIn && (
        <Button variant="danger" onClick={handleLogout} className="mb-3">
          Logout
        </Button>
      )}
      <Row>
        {destinations.map((destination) => {
          const isBooked = bookedDestinations.includes(destination.id);

          return (
            <Col md={4} key={destination.id}>
              <Card className="destination-card" onClick={() => handleShowDetail(destination)}>
                <div className="img-container">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:7000/images/${destination.gambar}`} 
                    className="destination-img" 
                  />
                  {isBooked && <div className="booked-label">Terboking</div>} {/* Label terboking */}
                  <div className="overlay">
                    <div className="text">View Details</div>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{destination.nama}</Card.Title>
                  <Card.Text>{destination.deskripsi}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedDestination?.nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <img
                src={`http://localhost:7000/images/${selectedDestination?.gambar}`}
                alt={selectedDestination?.nama}
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col md={4}>
              <p><strong>Durasi:</strong> {selectedDestination?.durasi}</p>
              <p><strong>Tersedia:</strong> {selectedDestination?.tanggal}</p>
              <p><strong>Harga Mulai:</strong> {selectedDestination?.harga}</p>
              <p>{selectedDestination?.deskripsi}</p>
              <Button variant="success" onClick={handleBookingClick}>
                Book Now
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Destination;
