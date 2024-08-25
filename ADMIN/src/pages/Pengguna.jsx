import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Pengguna = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:7000/api/user');
      setUsers(response.data);
    } catch (error) {
      setError('Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:7000/api/user/${selectedUser.id}`, newUser);
      } else {
        await axios.post('http://localhost:7000/api/user', newUser);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      setError('Gagal menambah/merubah pengguna');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/user/${id}`);
      fetchUsers();
    } catch (error) {
      setError('Gagal menghapus pengguna');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShow = () => {
    setNewUser({ name: '', email: '', role: 'user' });
    setEditMode(false);
    setSelectedUser(null);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-4">
      <Button variant="primary" onClick={handleShow}>
        Tambah Pengguna
      </Button>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" className="mr-2" onClick={() => { 
                  setEditMode(true); 
                  setSelectedUser(user); 
                  setNewUser({ name: user.name, email: user.email, role: user.role });
                  setShow(true);
                }}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Pengguna' : 'Tambah Pengguna'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNamaPengguna">
              <Form.Label>Nama Pengguna</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama pengguna"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmailPengguna">
              <Form.Label>Email Pengguna</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email pengguna"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formRolePengguna">
              <Form.Label>Role Pengguna</Form.Label>
              <Form.Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            {editMode ? 'Edit Pengguna' : 'Tambah Pengguna'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pengguna;
