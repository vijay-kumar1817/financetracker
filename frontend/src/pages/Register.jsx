import React from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (credentials) => {
    const res = await axios.post('http://localhost:5000/api/users/register', credentials);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0e7ff 0%, #f3f4f6 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>
      <style>{`
        .navbar-register {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: #4e54c8;
          z-index: 1000;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 16px;
          min-height: 56px;
        }
        .header-text {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }
        .title {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
        }
        .subtitle {
          font-size: 12px;
          color: #e0e0e0;
        }
        .nav-buttons {
          display: flex;
          gap: 12px;
        }
        .nav-link {
          text-decoration: none;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .nav-link.active {
          background: #4e54c8;
          color: #fff;
        }
        .nav-link.disabled {
          cursor: not-allowed;
          background: none;
          color: #a5b4fc;
          opacity: 0.5;
        }
        .login-btn, .register-btn {
          margin-left: 12px;
          background: #2563eb;
          color: #fff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover, .register-btn:hover {
          background: #1e40af;
        }
        .register-card {
          background: #fff;
          padding: 2.5rem 2rem;
          border-radius: 14px;
          box-shadow: 0 4px 32px 0 rgba(255, 0, 0, 0.08);
          min-width: 340px;
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 80px;
        }
        .register-title {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #2563eb;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 1px;
        }
      `}</style>
      <div className="navbar-register">
        <div className="header-text">
          <div className="title">Personal Finance Assistant</div>
          <div className="subtitle">
            Track, manage, and understand your financial activities effortlessly.
          </div>
        </div>
        <div className="nav-buttons">
          <div
            className="nav-link active"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Home
          </div>
          {['form','uploads','charts','transactions'].map((page) => (
            <div
              key={page}
              className="nav-link disabled"
              style={{ pointerEvents: 'none', opacity: 0.5 }}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </div>
          ))}
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="register-btn" style={{ pointerEvents: 'none', opacity: 0.7 }}>Register</button>
        </div>
      </div>
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <AuthForm onSubmit={handleRegister} isLogin={false} />
      </div>
    </div>
  );
};

export default Register;