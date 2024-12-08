// src/api.ts
const API_BASE_URL = 'http://localhost:3000';

// Types
export type SignupData = {
    username: string;
    password: string;
    email: string;
};

export type VerifyEmailData = {
    token: string;
};

export type SigninData = {
    username: string;
    password: string;
};


export type UserProfileResponse = {
    username: string;
    email: string;
};

export type Transaction = {
    senderAccount: string;
    receiverAccount: string;
    amount: number;
    userId: string;
};

export type AccountResponse = {
    accountNumber: string;
    balance: number;
};

export type CreateAccountResponse = {
    message: string;
    account: {
        accountNumber: string;
        balance: number;
    };
};

export type TransactionResponse = {
    message: string;
    transaction: Transaction;
};
/* 
// Error handling helper
const handleResponseError = (status: number): string => {
    switch (status) {
        case 400:
            return 'Invalid request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'User not verified';
        case 404:
            return 'Not found';
        default:
            return 'Server error';
    }
};
 */
// Base API client
const apiClient = async <T>(
    endpoint: string,
    token: string,
    options: {
        method?: string;
        body?: any;
    } = {}
): Promise<T> => {
    const { method = 'GET', body } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'request failed');
    }

    return response.json();
};

// API endpoints
export const signup = async (data: SignupData): Promise<void> =>{
    const response = await fetch(`${API_BASE_URL}/authentication/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Signup failed');
    }

};
export const signin = async (data: SigninData): Promise<{ token: string }> =>{
    const response = await fetch(`${API_BASE_URL}/authentication/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Signin failed');
    }

    return response.json();
};

export const verifyEmail = async (verifyCode: string): Promise<{ redirect: string }> => {
    const response = await fetch(`${API_BASE_URL}/authentication/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verifyCode }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Verify email failed');
    }

    return response.json();
};
    

export const getUserInfo = (token: string): Promise<UserProfileResponse> =>
    apiClient('/user/profile', token);

export const getAccountBalance = (token: string, accountNumber: string): Promise<{ balance: number }> =>
    apiClient(`/account/balance/${accountNumber}`, token);

export const getUserAccounts = (token: string): Promise<{ accounts: AccountResponse[] }> =>
    apiClient('/user/accounts', token);

export const createAccount = (token: string, initialBalance: number): Promise<CreateAccountResponse> =>
    apiClient('/account/', token, {
        method: 'POST',
        body: { initialBalance },
    });

export const createTransaction = (
    token: string,
    transaction: Omit<Transaction, 'userId'>
): Promise<TransactionResponse> =>
    apiClient('/transaction/create', token, {
        method: 'POST',
        body: transaction,
    });

export const getTransactions = (
    token: string,
    accountId: string
): Promise<Transaction[]> =>
    apiClient(`/transaction/list/${accountId}`,token);