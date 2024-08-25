// src/App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import AdminNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Destinasi from './pages/Destinasi';
import Pengguna from './pages/Pengguna';
import Booking from './pages/Booking';
import Pembayaran from './pages/Pembayaran';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <AdminNavbar />
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/destinasi" element={<Destinasi />} />
                <Route path="/pengguna" element={<Pengguna />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
