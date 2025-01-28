import axiosClient from './axiosClient';

export const fetchSettings = async () => {
    const response = await axiosClient.get('/settings');
    return response.data;
};
