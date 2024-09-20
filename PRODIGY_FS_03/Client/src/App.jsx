import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Home from './components/Home';
import Footer from './components/Footer/Footer';
import CategoryPage from './components/CategoryPage/CategoryPage';
import SearchResultsPage from './components/Search/SearchResultsPage';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import SupportTicket from './components/SupportTicket/SupportTicket';
import CheckTicketStatus from './components/SupportTicket/CheckTicketStatus';
import AdminDashboard from './Admin/Dashboard/AdminDashboard';
import EditProduct from './Admin/Product/EditProduct';
import OrderHistory from './components/Order/OrderHistory';


const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} cart={cart} />
      <Routes>
        {/* Client Side */}
        <Route path="/" element={user ? <Home addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {user && <Route path="/profile" element={<Profile user={user} />} />}
        <Route path="/products/:id" element={user ? <ProductDetail addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} /> : <Navigate to="/login" />} />
        <Route path="/category/:category" element={user ? <CategoryPage addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <SearchResultsPage addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/support" element={user ? <SupportTicket /> : <Navigate to="/login" />} />
        <Route path="/check-ticket-status" element={user ? <CheckTicketStatus /> : <Navigate to="/login" />} />
        <Route path="/order-history" element={<OrderHistory />} />

        {/* Admin Side */}
        {user?.role === 'admin' && (
          <>
            <Route path="/admin-dashboard/*" element={<AdminDashboard user={user} />} />
            <Route path="/admin-dashboard/edit-product/:id" element={<EditProduct />} />
          </>
        )}
      </Routes>
      {user?.role !== 'admin' && <Footer />}
    </Router>
  );
};

export default App;
