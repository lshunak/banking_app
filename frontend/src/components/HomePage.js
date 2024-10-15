import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

function HomePage() {
    return (
        <div className="container">
            <header className="header">
                <h1>Welcome to Liran's Banking App</h1>
            </header>
            <main className="main">
                <nav className="nav">
                    <Link
                        to="/signup"
                        className="button"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/signin"
                        className="button"
                    >
                        Sign In
                    </Link>
                </nav>
            </main>
            <footer className="footer">
                <p>&copy; 2024 My Banking App.</p>
            </footer>
        </div>
    );
}

export default HomePage;
