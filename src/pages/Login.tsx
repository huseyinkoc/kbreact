import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { loginCheck } from '../api/authService';

const Login: React.FC = () => {
    const { isAuthenticated, login: loginUser } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Eğer kullanıcı zaten giriş yapmışsa otomatik olarak /dashboard'a yönlendir
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginCheck(username, password);

            // Kullanıcı bilgilerini sakla ve yönlendir
            loginUser(response.token, response.csrf_token, response.user);

            setError(null);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Giriş Yap</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Kullanıcı Adı</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Giriş Yap</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
