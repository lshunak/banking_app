// src/api.js
const API_BASE_URL = 'http://localhost:5000/authentication';

export const signup = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const signin = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Signin failed');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
