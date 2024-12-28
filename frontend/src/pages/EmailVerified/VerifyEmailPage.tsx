// src/pages/EmailVerified/VerifyEmailPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../api';
import './VerifyEmailPage.css';

type VerificationStatus = 'loading' | 'success' | 'error';

const VerifyEmailPage: React.FC = () => {
    const [status, setStatus] = useState<VerificationStatus>('loading');
    const [message, setMessage] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUserEmail = async () => {
            const params = new URLSearchParams(location.search);
            const verifyCode = params.get('verifyCode');

            if (!verifyCode) {
                setStatus('error');
                setMessage('No verification code provided');
                return;
            }

            try {
                // Set loading state first
                setStatus('loading');
                setMessage('');

                // Wait for verification response
                await verifyEmail(verifyCode);
                setStatus('success');
                setMessage('Email verified successfully!');
                
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
                
            } catch (error) {
                setStatus('error');
                setMessage(error instanceof Error ? error.message : 'Verification failed');
            }
        };

        verifyUserEmail();
    }, [location.search, navigate]);

    return (
        <div className="verify-email-container">
            {status === 'loading' && (
                <div className="verify-message">
                    <div className="loader"></div>
                    <p>Verifying your email...</p>
                </div>
            )}
            
            {status === 'success' && (
                <div className="verify-message success">
                    <h2>✓</h2>
                    <p>"user verified"</p>
                </div>
            )}
            
            {status === 'error' && (
                <div className="verify-message error">
                    <h2>⚠</h2>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyEmailPage;
