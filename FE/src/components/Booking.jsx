// import PropTypes from 'prop-types';
// import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../context/AuthContext'; // Adjust import according to your context path

// function Booking({ destinationId }) {
//   const navigate = useNavigate();
//   const [isLoggedIn] = useAuthContext(); // Adjust based on actual context usage

//   const handleBookingClick = async () => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }

//     // Booking logic here
//   };

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <Card>
//             <Card.Body>
//               <Card.Title>Book Destination {destinationId}</Card.Title>
//               <Button onClick={handleBookingClick}>Book Now</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// Booking.propTypes = {
//   destinationId: PropTypes.number.isRequired,
// };

// export default Booking;
