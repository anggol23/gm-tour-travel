import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Pembayaran = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Pengguna</th>
            <th>Jumlah</th>
            <th>Tanggal</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id}>
              <td>{index + 1}</td>
              <td>{payment.userName}</td>
              <td>{`Rp. ${payment.amount}`}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Pembayaran;
