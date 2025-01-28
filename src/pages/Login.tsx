import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login: loginUser } = useAuth(); // AuthProvider'dan login fonksiyonunu alın
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            // AuthProvider ile token'ları ve login durumunu güncelle
            loginUser(response.token, response.csrf_token);

            setError(null); // Hata durumunu sıfırla

            // Başarılı giriş sonrası yönlendirme            
            navigate('/dashboard'); // Kullanıcıyı dashboard sayfasına yönlendir
        } catch (err: any) {
            setError(err.message); // Hata mesajını göster
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
