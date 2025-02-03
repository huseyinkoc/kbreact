import axiosClient from './axiosClient';

export const fetchSiteSettings = async () => {

    try {
        const response = await axiosClient.get('/settings');
        return response.data;
    } catch (error) {
        console.error('Site ayarları çekilirken hata oluştu:', error);
        throw error;
    }

};
