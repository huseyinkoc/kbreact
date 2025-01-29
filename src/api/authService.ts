import axiosClient from './axiosClient';

interface LoginResponse {
    csrf_token: string;
    message: string;
    token: string;
    user: {
        name: string;
        surname: string;
        full_name?: string;
    };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post('/auth/login', { username, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Giriş başarısız!');
    }
};
