import { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Import file CSS

function Destination() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/destinasi');
        setDestinations(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleShowDetail = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleBookingClick = () => {
    navigate('/login'); // Mengarahkan pengguna ke halaman login
  };

  if (loading) return <Container><h2 className="text-center">Loading...</h2></Container>;
  if (error) return <Container><h2 className="text-center">{error}</h2></Container>;

  return (
    <Container>
      <h2 className="text-center">Destination</h2>
      <Row>
        {destinations.map((destination) => (
          <Col md={4} key={destination.id}>
            <Card className="destination-card" onClick={() => handleShowDetail(destination)}>
              <div className="img-container">
                <Card.Img variant="top" src={destination.gambar} className="destination-img" />
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
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedDestination?.nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <img
                src={selectedDestination?.gambar}
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
          <Row className="mt-4">
            <Col>
              <h3>Price Details</h3>
              <ul>
                {selectedDestination?.priceDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
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
