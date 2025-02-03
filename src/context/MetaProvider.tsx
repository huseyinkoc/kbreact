import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSiteConfig } from './SiteConfigContext';

interface MetaProviderProps {
    children: React.ReactNode;
}

const MetaProvider: React.FC<MetaProviderProps> = ({ children }) => {
    const siteConfig = useSiteConfig();

    return (
        <HelmetProvider>
            <Helmet>
                <title>{siteConfig?.title[siteConfig.default_lang] || 'Yükleniyor...'}</title>
                <meta name="description" content={siteConfig?.description[siteConfig.default_lang] || ''} />
                <meta property="og:title" content={siteConfig?.title[siteConfig.default_lang] || 'Yükleniyor...'} />
                <meta property="og:description" content={siteConfig?.description[siteConfig.default_lang] || ''} />
                <meta property="og:image" content={siteConfig?.logo_url || ''} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={siteConfig?.default_lang === 'tr' ? 'tr_TR' : 'en_US'} />
                <link rel="icon" href={siteConfig?.favicon_url || '/favicon.ico'} />
            </Helmet>
            {children}
        </HelmetProvider>
    );
};

export default MetaProvider;
