import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    name: string;
    surname: string;
    full_name?: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    csrfToken: string | null;
    user: User | null;
    login: (token: string, csrfToken: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [csrfToken, setCsrfToken] = useState<string | null>(localStorage.getItem('csrf_token'));
    const [user, setUser] = useState<User | null>(
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
    );

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedCsrfToken = localStorage.getItem('csrf_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedCsrfToken && storedUser) {
            setToken(storedToken);
            setCsrfToken(storedCsrfToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (token: string, csrfToken: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('csrf_token', csrfToken);
        localStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setCsrfToken(csrfToken);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('csrf_token');
        localStorage.removeItem('user');

        setToken(null);
        setCsrfToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, csrfToken, user, login, logout }}>
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
