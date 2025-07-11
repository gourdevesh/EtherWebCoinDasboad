import { toast } from "react-toastify";
import api from "./api";

export const notifyBackendOfDeposit = async (deposit_amount, deposit_asset, deposit_type) => {
  const formData = new FormData()
  formData.append('deposit_amount', deposit_amount)
  formData.append('deposit_asset', deposit_asset)
  formData.append('deposit_type', deposit_type)

  try {
    const token = localStorage.getItem('token')
    console.log(token);

    const response = await api.post(
      '/start-deposit',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,

          Accept: 'application/json',
        },
      }
    )

    return response.data

  } catch (error) {
    const errData = error?.response?.data;

    if (errData?.errors && typeof errData.errors === 'object') {
      const firstField = Object.keys(errData.errors)[0];
      const firstErrorMessage = errData.errors[firstField]?.[0];
      throw new Error(firstErrorMessage || 'Validation error');
    } else {
      throw new Error(error.message);
    }
  }
}
export const updateDeposit = async (deposit_id, deposit_amount, from_address, txn_hash) => {
  const formData = new FormData();
  formData.append('deposit_id', deposit_id);
  formData.append('deposit_amount', deposit_amount);
  formData.append('from_address', from_address);
  formData.append('txn_hash', txn_hash);

  try {
    const token = localStorage.getItem('token');
    const response = await api.post(
      '/update-deposit',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    );
    localStorage.removeItem('deposit_id');

    return response.data;
  } catch (error) {
    const errData = error?.response?.data;

    if (errData?.errors && typeof errData.errors === 'object') {
      const firstField = Object.keys(errData.errors)[0];
      const firstErrorMessage = errData.errors[firstField]?.[0];
      throw new Error(firstErrorMessage || 'Validation error');
    } else {
      throw new Error(error.message || 'Deposit update failed');
    }
  }
};

export const getDeposits = async (page = 1, perPage = 10) => {
  try {
    const token = localStorage.getItem('token');

    const response = await api.get('/deposits', {
      params: {
        page,
        per_page: perPage,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data?.data;
    return {
      deposits: data.deposits,
      pagination: {
        currentPage: data.current_page,
        total: data.total,
        perPage,
        lastPage: Math.ceil(data.total / perPage),
      },
    };
  } catch (error) {
    const errData = error?.response?.data;
    const errorMessage = error.response?.data?.message || 'Failed to fetch stake list';
    if (error.response?.status === 401) {
      toast.error(errorMessage);
      localStorage.removeItem('token');
      window.location.href = '/#/login';
      return;
    }


    else {
      throw new Error(errData?.message || error.message || 'Failed to fetch deposits');
    }
  }
};

export const submitdepositAsset = async ({
  access_key,
  txn_id,
  client_id,
  user_name,
  deposit_amt,
  deposit_network,
  deposit_asset,
  back_url,
}) => {
  const formData = new FormData();
  formData.append('access_key', access_key);
  formData.append('txn_id', txn_id);
  formData.append('client_id', client_id);
  formData.append('user_name', user_name);
  formData.append('deposit_amt', deposit_amt);
  formData.append('deposit_network', deposit_network);
  formData.append('deposit_asset', deposit_asset);
  formData.append('back_url', back_url);

  try {
    const response = await api.post('https://api.zipwallet.net/api/deposit-asset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errData = error?.response?.data;

    if (errData?.errors && typeof errData.errors === 'object') {
      const firstField = Object.keys(errData.errors)[0];
      const firstErrorMessage = errData.errors[firstField]?.[0];
      throw new Error(firstErrorMessage || 'ZipWallet API validation error');
    } else {
      throw new Error(errData?.message || error.message || 'ZipWallet API error');
    }
  }
};
export const checkZipwalletAndUpdate = async ({ accessKey, depositAsset, clientId, txnId }) => {
  try {
    const url = `https://api.zipwallet.net/api/deposit-details`;
    const response = await api.get(url, {
      params: {
        access_key: accessKey,
        client_id: clientId,
        deposit_asset: depositAsset,
        txn_id: txnId,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const data = response.data?.data[0];
    const deposit_id = localStorage.getItem('deposit_id');

    if (data.status === 'success') {
      const result = await updateDeposit(
        deposit_id,
        data.paid_amount,
        data.from_address,
        data.txn_hash
      );

      return result;
    } else {
      return null;
    }
  } catch (error) {
    const errData = error?.response?.data;

    if (errData?.errors && typeof errData.errors === 'object') {
      const firstField = Object.keys(errData.errors)[0];
      const firstErrorMessage = errData.errors[firstField]?.[0];
      throw new Error(firstErrorMessage || 'Validation error');
    } else {
      throw new Error(errData?.message || error.message || 'Zipwallet API failed');
    }
  }
};