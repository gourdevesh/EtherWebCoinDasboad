import { toast } from 'react-toastify';
import api from './api';

export const getTransfers = async (page = 1, per_page = 10) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    try {
        const response = await api.get('/getTransfers', {
            params: { page, per_page },
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch stake list';
        if (error.response?.status === 401) {
            toast.error(errorMessage);
            localStorage.removeItem('token');
            window.location.href = '/#/login';
            return;
        }
        throw new Error(errorMessage?.message || 'Failed to fetch transfer history');
    }
};
