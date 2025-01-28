import React, { useEffect, useState } from 'react';
import { fetchSettings } from '../api/settings';

const SiteInfo: React.FC = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await fetchSettings();
            setSettings(data);
        };

        loadSettings();
    }, []);

    if (!settings) {
        return <p>Loading...</p>;
    }

    console.log({ settings })

    return (
        <div>
            <img src={settings.logo_url} alt="Logo" />
            <h1>{settings.title.en}</h1>
            <p>{settings.description.en}</p>
        </div>
    );
};

export default SiteInfo;
