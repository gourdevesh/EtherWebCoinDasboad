import { toast } from 'react-toastify'
import api from './api'

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token')

        if (!token) {
            throw new Error('No authentication token found')
        }

        const response = await api.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })

        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch stake list';
        if (error.response?.status === 401) {
            toast.error(errorMessage);
            localStorage.removeItem('token');
            window.location.href = '/#/login';
            return;
        } throw error.response?.data || { message: 'Failed to fetch profile' }
    }
}

export const uploadProfileImage = async (file, token) => {
    const formData = new FormData()
    formData.append('profile_image', file)

    try {
        const response = await api.post(
            '/profile/update-image',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to upload profile image' }
    }
}

export const updatePassword = async (payload) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token missing');
        }

        const response = await api.post('/updatePassword', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        const errData = error?.response?.data;

        if (errData?.error && typeof errData.error === 'object') {
            const firstField = Object.keys(errData.error)[0];
            const firstErrorMessage = errData.error[firstField]?.[0];
            throw new Error(firstErrorMessage || 'Validation error');
        }

        throw new Error(errData?.message || error.message || 'Password update failed');
    }
};

