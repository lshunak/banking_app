// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <header className="header">
      <h1 style={{ float: 'left', margin: 0 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          LS Banking Services
        </Link>
      </h1>
      {user ? (
        <button
          onClick={handleLogout}
          className="button"
          style={{ float: 'right', margin: 0 }}
        >
          Log Out
        </button>
      ) : (
        <Link
          to="/signin"
          className="button"
          style={{ float: 'right', margin: 0 }}
        >
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;
