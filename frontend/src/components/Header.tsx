// components/Header.jsx
import React from 'react';

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        window.location.href = '/'; // Redirect to homepage
    };

    return (
        <header className="header">
            <h1 style={{ float: 'left', margin: 0 }}>LS Banking Services</h1>
            <button onClick={handleLogout} className="button" style={{ float: 'right', margin: 0 }}>Logout</button>

         </header>
    );
};

export default Header;
