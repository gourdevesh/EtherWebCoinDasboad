import api from './api';

export const stake = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.post(
            '/stake-list',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch stake list' };
    }
};

export const submitStake = async (stakeAmount, token) => {
    const formData = new FormData()
    formData.append('stake_amount', stakeAmount)
    try {
        const response = await api.post('/stake', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Stake submission failed' }
    }
}