import axiosClient from './axiosClient';

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosClient.post('/auth/login', { email, password })

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            return { success: true, message: 'Login successful' };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        return { success: false, message: 'Error during login' };
    }
};
