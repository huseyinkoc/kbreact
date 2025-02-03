import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchSiteSettings } from '../api/settings';
import { SiteConfig } from '../types/SiteConfig';

const SiteConfigContext = createContext(null);

export const SiteConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState(() => {
        const storedConfig = localStorage.getItem('siteConfig');
        return storedConfig ? JSON.parse(storedConfig) : null;
    });

    useEffect(() => {
        const loadSiteSettings = async () => {
            try {
                const settings = await fetchSiteSettings();

                if (JSON.stringify(settings) !== JSON.stringify(siteConfig)) {
                    setSiteConfig(settings);
                    localStorage.setItem('siteConfig', JSON.stringify(settings)); // Yeni ayarları kaydet
                }
            } catch (error) {
                console.error('Site ayarları yüklenirken hata oluştu:', error);
            }
        };

        if (!siteConfig) {
            loadSiteSettings();
        }
    }, []);

    return (
        <SiteConfigContext.Provider value={siteConfig}>
            {children}
        </SiteConfigContext.Provider>
    );
};

export const clearSiteConfig = () => {
    localStorage.removeItem('siteConfig'); // Saklanan veriyi temizle
    localStorage.removeItem('siteConfigLastUpdated'); // Zaman damgasını da temizle
};

export const useSiteConfig = (): SiteConfig | null => {
    clearSiteConfig();
    return useContext(SiteConfigContext);
};

