import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', background: 'linear-gradient(90deg, #e0e7ff 0%, #f3f4f6 100%)'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
          Welcome to FinanceApp
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#374151', marginBottom: '2rem', maxWidth: 500, textAlign: 'center' }}>
          Track, manage, and understand your financial activities effortlessly. Login or Register to get started!
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/login" className="navbar-btn">Login</a>
          <a href="/register" className="navbar-btn">Register</a>
        </div>
      </div>
    </>
  );
};

export default Home;
