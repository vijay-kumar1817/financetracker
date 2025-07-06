import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar-home">
      <style>{`
        .navbar-home {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .navbar-logo {
          font-size: 1.7rem;
          font-weight: bold;
          color: #2563eb;
          text-decoration: none;
        }
        .navbar-actions {
          display: flex;
          gap: 1rem;
        }
        .navbar-btn {
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
        }
        .navbar-btn:hover {
          background: #1e40af;
        }
      `}</style>
      <Link to="/" className="navbar-logo">FinanceApp</Link>
      <div className="navbar-actions">
        <Link to="/login" className="navbar-btn">Login</Link>
        <Link to="/register" className="navbar-btn">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
