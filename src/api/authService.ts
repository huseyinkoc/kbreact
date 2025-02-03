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

export const loginCheck = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosClient.post('/auth/login-by-email', { email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Giriş başarısız!');
    }
};
