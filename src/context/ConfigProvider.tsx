import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchSettings } from '../api/settings';

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const data = await fetchSettings();
                setConfig(data);
            } catch (error) {
                console.error('Config yüklenirken hata oluştu:', error);
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig() must be used within a ConfigProvider');
    }
    return context;
};
