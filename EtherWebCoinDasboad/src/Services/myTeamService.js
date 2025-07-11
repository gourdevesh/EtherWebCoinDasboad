import api from './api';
export const myTeam = async () => {
    try {
        const token = localStorage.getItem('token')

        if (!token) {
            throw new Error('No authentication token found')
       }

        const response = await api.get('/my-team', {
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

export const myReferral = async () => {
    try {
        const token = localStorage.getItem('token')

        if (!token) {
            throw new Error('No authentication token found')
       }

        const response = await api.get('/my-referral', {
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