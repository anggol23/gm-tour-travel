// src/components/Sidebar.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx'; // Pastikan path-nya benar
import { Nav, Navbar, Container } from 'react-bootstrap';

const Sidebar = () => {
  const { isLoggedIn, userName } = useContext(AuthContext);

  return (
    <div className="bg-dark text-light" id="sidebar">
      <Container className="py-3">
        <Navbar.Brand as={Link} to="/">
          <img
            alt="GM Tour & Travel"
            src="/logogm.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          <span className="ms-2">GM Tour And Travel</span>
        </Navbar.Brand>
        <Nav className="flex-column mt-4">
          {isLoggedIn && (
            <Nav.Item className="text-light mb-2">
              Welcome, {userName}
            </Nav.Item>
          )}
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/destinasi">Destinasi</Nav.Link>
          <Nav.Link as={Link} to="/pengguna">Pengguna</Nav.Link>
          <Nav.Link as={Link} to="/booking">Booking</Nav.Link>
          <Nav.Link as={Link} to="/pembayaran">Pembayaran</Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default Sidebar;
