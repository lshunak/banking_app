// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import Dashboard from './components/Dashboard';
import AccountInfo from './components/AccountInfo';
import VerifyEmailPage from './components/VerifyEmailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-info" element={<AccountInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
