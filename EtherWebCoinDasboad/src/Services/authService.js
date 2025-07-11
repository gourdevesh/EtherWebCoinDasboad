import api from './api';
import apiClient from './apiClient';

export const registerUser = async (payload) => {
    try {
        const response = await api.post('/register', payload);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        const res = error.response?.data;
        let message = 'Registration failed';

        if (res?.error && typeof res.error === 'object') {
            const firstKey = Object.keys(res.error)[0];
            if (Array.isArray(res.error[firstKey])) {
                message = res.error[firstKey][0];
            }
        } else if (typeof res?.message === 'string') {
            message = res.message;
        }

        return {
            success: false,
            error: { message },
        };
    }
};


// authService.js
export const loginUser = async (payload) => {
    try {
        const response = await api.post('/login', payload);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: 'Login failed' },
        };
    }
};


export const verifyEmail = async (payload) => {
    try {
        const response = await api.post('/verify-email', payload);
        return { status: true, message: response.data.message };
    } catch (error) {
        const res = error.response?.data;
        let message = 'Something went wrong';
        if (res?.error && typeof res.error === 'object') {
            const firstKey = Object.keys(res.error)[0];
            if (Array.isArray(res.error[firstKey])) {
                message = res.error[firstKey][0];
            }
        } else if (typeof res?.message === 'string') {
            message = res.message;
        }

        return { status: false, message };
    }
};

export const resendVerificationEmail = async (payload) => {
  try {
    const response = await apiClient.post('/password-reset', payload);
    return { status: true, message: response.data.message };
  } catch (error) {
    const res = error.response?.data;
    let message = 'Something went wrong';

    if (res?.error && typeof res.error === 'object') {
      const firstKey = Object.keys(res.error)[0];
      if (Array.isArray(res.error[firstKey])) {
        message = res.error[firstKey][0];
      }
    } else if (typeof res?.message === 'string') {
      message = res.message;
    }

    return { status: false, message };
  }
};
export const sendOtp = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found');
    }

    const response = await api.post('/mail/otpSent',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'X-CSRF-TOKEN': '',
            },
        }
    );

    return response.data;
};

export const updateTransactionPassword = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }

    try {
        const response = await api.post(
            '/updateTransactionPassword',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        const errData = error?.response?.data;
        if (errData?.error && typeof errData.error === 'object') {
            const firstField = Object.keys(errData.error)[0];
            const firstErrorMessage = errData.error[firstField]?.[0];
            throw new Error(firstErrorMessage || 'Validation error');
        }
        throw new Error(errData?.message || error.message || 'Failed to update password');
    }
};
export const logoutUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')

    const response = await api.post(
        '/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'X-CSRF-TOKEN': '',
            },
        }
    )

    return response.data
}
export const transferFund = async ({ receiver_id, amount, password }) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    try {
        const formData = new FormData();
        formData.append('receiver_id', receiver_id);
        formData.append('amount', amount);
        formData.append('password', password);

        const response = await api.post('/transfer', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-CSRF-TOKEN': '',
            },
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        const errData = error.response?.data;
        let message = 'Transfer failed';
        if (errData?.error && typeof errData.error === 'object') {
            const firstKey = Object.keys(errData.error)[0];
            message = errData.error[firstKey]?.[0] || message;
        } else if (typeof errData?.message === 'string') {
            message = errData.message;
        }

        return {
            success: false,
            error: { message },
        };
    }
};

