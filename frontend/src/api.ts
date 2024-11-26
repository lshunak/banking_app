// src/api.ts
const API_BASE_URL = 'http://localhost:3000';

type SignupData = {
    username: string;
    password: string;
    email?: string;
    phone?: string;
};

type SigninData = {
    username: string;
    password: string;
};

type UserInfoResponse = {
    username: string;
    email: string;
    phone: string;
};

export const signup = async (data: SignupData): Promise<UserInfoResponse> => {
    const response = await fetch(`${API_BASE_URL}/authentication/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Signup failed');
    }

    return response.json();
};

export const signin = async (data: SigninData): Promise<{ token: string }> => {
    const response = await fetch(`${API_BASE_URL}/authentication/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Signin failed');
    }

    return response.json();
};

// Fetch User Info
export const getUserInfo = async (token: string): Promise<UserInfoResponse> => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user info');
    }

    return response.json();
};
