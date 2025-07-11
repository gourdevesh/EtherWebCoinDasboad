import api from './api';
export const myRank = async () => {
    try {
        const token = localStorage.getItem('token')

        if (!token) {
            throw new Error('No authentication token found')
        }

        const response = await api.get('/user-rank', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        })

        return response.data
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch profile' }
    }
}