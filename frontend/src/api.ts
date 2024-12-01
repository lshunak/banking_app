// src/api.ts
const API_BASE_URL = 'http://localhost:3000';

// Types
export type SignupData = {
    username: string;
    password: string;
    email: string;
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

// Base API client
const apiClient = async <T>(
    endpoint: string,
    options: {
        method?: string;
        token?: string;
        body?: any;
    } = {}
): Promise<T> => {
    const { method = 'GET', token, body } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
        throw new Error(handleResponseError(response.status));
    }

    return response.json();
};

// API endpoints
export const signup = (data: SignupData): Promise<void> =>
    apiClient('/authentication/signup', {
        method: 'POST',
        body: data,
    });

export const signin = (data: SigninData): Promise<{ token: string }> =>
    apiClient('/authentication/signin', {
        method: 'POST',
        body: data,
    });

export const verifyEmail = (verifyCode: string): Promise<{ redirect: string }> =>
    apiClient(`/authentication/verify-email?verifyCode=${verifyCode}`);

export const getUserInfo = (token: string): Promise<UserProfileResponse> =>
    apiClient('/user/profile', { token });

export const getAccountBalance = (token: string, accountNumber: string): Promise<{ balance: number }> =>
    apiClient(`/account/balance/${accountNumber}`, { token });

export const getUserAccounts = (token: string): Promise<{ accounts: AccountResponse[] }> =>
    apiClient('/user/accounts', { token });

export const createAccount = (token: string, initialBalance: number): Promise<CreateAccountResponse> =>
    apiClient('/account/', {
        method: 'POST',
        token,
        body: { initialBalance },
    });

export const createTransaction = (
    token: string,
    transaction: Omit<Transaction, 'userId'>
): Promise<TransactionResponse> =>
    apiClient('/transaction/create', {
        method: 'POST',
        token,
        body: transaction,
    });

export const getTransactions = (
    token: string,
    accountId: string
): Promise<Transaction[]> =>
    apiClient(`/transaction/list/${accountId}`, { token });