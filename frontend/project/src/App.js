import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { ShowsProvider } from './components/context/ShowsContext.jsx';

import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ShowsList from './pages/ShowsList';
import ShowLists from './pages/ShowLists';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ShowsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ShowsList />} />
            <Route path="/home" element={<ShowLists />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </ShowsProvider>
    </AuthProvider>
  );
}

export default App;