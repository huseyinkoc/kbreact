import axiosClient from './axiosClient';

interface LoginResponse {
    csrf_token: string;
    message: string;
    token: string;
    user: {
        full_name: string;
        name: string;
        surname: string;
    };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post('/auth/login', { username, password });
        return response.data; // Backend yanıtını döndür
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login işlemi başarısız');
    }
};
