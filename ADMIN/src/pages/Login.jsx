import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Pastikan ini digunakan

  // Kredensial admin tetap
  const adminCredentials = {
    username: 'admin@gmail.com',
    password: 'admin'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifikasi kredensial admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
      try {
        // Simulasi login
        login(username);
        navigate('/dashboard'); // Redirect setelah login
      } catch (error) {
        setErrorMessage('Login gagal. Coba lagi nanti.');
      }
    } else {
      setErrorMessage('Username atau password salah.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
