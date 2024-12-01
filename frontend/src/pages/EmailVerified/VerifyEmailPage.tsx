// VerifyEmailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            const params = new URLSearchParams(location.search);
            const verifyCode = params.get('verifyCode');

            if (verifyCode) {
                try {
                    const response = await axios.get(`http://localhost:3000/authentication/verify-email?verifyCode=${verifyCode}`);
                    setMessage(response.data.message);
                    setLoading(false);
                    setTimeout(() => navigate('/signin'), 3000); // Redirect to signin after a short delay
                } catch (error) {
                    setMessage('Verification failed');
                    setLoading(false);
                }
            } else {
                setMessage('Invalid verification code');
                setLoading(false);
            }
        };

        verifyEmail();
    }, [location.search, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default VerifyEmailPage;
