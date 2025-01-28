import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    csrfToken: string | null;
    login: (token: string, csrfToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [csrfToken, setCsrfToken] = useState<string | null>(localStorage.getItem('csrf_token'));

    const login = (token: string, csrfToken: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('csrf_token', csrfToken);
        setToken(token);
        setCsrfToken(csrfToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('csrf_token');
        setToken(null);
        setCsrfToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, csrfToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
