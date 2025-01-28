import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // LocalStorage'den kullanıcı bilgilerini al
        const token = localStorage.getItem('token');
        const csrfToken = localStorage.getItem('csrf_token');

        if (!token || !csrfToken) {
            console.log('Kullanıcı giriş yapmamış');
            return;
        }

        // Kullanıcı bilgilerini backend'den veya bir state'ten çekebilirsiniz
        const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userInfo);
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Hoşgeldiniz, {user.full_name || 'Kullanıcı'}!</h2>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
};

export default Dashboard;
