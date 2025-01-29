import React from 'react';
import { useAuth } from '../context/AuthProvider';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>{user.full_name || `${user.name} ${user.surname}`}!</h2>
                </div>
            ) : (
                <p>Kullanıcı bilgisi bulunamadı.</p>
            )}
            <button onClick={logout}>Çıkış Yap</button>
        </div>
    );
};

export default Dashboard;
