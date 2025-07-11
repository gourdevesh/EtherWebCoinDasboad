import Web3 from "web3";
import api from "./api";
import CryptoJS from 'crypto-js';
import { toast } from "react-toastify";
import { useAuth } from "../views/pages/context/AuthContext";



export const startWithdraw = async ({ amount, to_address, password }) => {
  const formData = new FormData();
  formData.append('amount', amount);
  formData.append('to_address', to_address);
  formData.append('password', password);

  const token = localStorage.getItem('token');

  try {
    const response = await api.post(
      '/withdraw/start',
      formData,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
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

    throw new Error(errData?.message || error.message);
  }
};
export const getWithdrawList = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.post(
      '/withdraw/list',
      {},
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch stake list' };

  }
};

export const decryptWithKey = (encryptedData, customKey) => {
  if (!encryptedData) return "";
  try {
    encryptedData = encryptedData.trim();
    if (!/^[A-Za-z0-9+/=]+$/.test(encryptedData)) return "";

    const key = CryptoJS.SHA256(customKey);
    const rawData = CryptoJS.enc.Base64.parse(encryptedData);

    if (!rawData || rawData.sigBytes < 32) return "";

    const iv = CryptoJS.lib.WordArray.create(rawData.words.slice(0, 4));
    const encryptedText = CryptoJS.lib.WordArray.create(rawData.words.slice(4));
    const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: encryptedText });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText || "";
  } catch (error) {
    return "";
  }
};
export const updateWithdraw = async ({ withdraw_id, txn_hash }) => {
  const token = localStorage.getItem('token');

  try {
    const formData = new FormData();
    formData.append('withdraw_id', withdraw_id);
    formData.append('txn_hash', txn_hash);

    const response = await api.post(
      '/withdraw/update',
      formData,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update withdraw request' };
  }
};



 const handleBNBTransfer = async (res, withdrawFormValues, userEmail) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));

    const fromAddress = res.data.from_address;
    const toAddress = withdrawFormValues.to_address;
    const amount = withdrawFormValues.amount;
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const nonce = await web3.eth.getTransactionCount(fromAddress, 'pending');
    const gasPrice = await web3.eth.getGasPrice();

    let gasLimit;
    try {
      gasLimit = await web3.eth.estimateGas({
        from: fromAddress,
        to: toAddress,
        value: amountInWei,
      });
    } catch (err) {
      gasLimit = 21000;
      toast.error('Estimate gas failed, using fallback.');
    }

    const tx = {
      from: fromAddress,
      to: toAddress,
      value: amountInWei,
      gas: gasLimit,
      gasPrice,
      nonce,
    };
 
    const decrypted = decryptWithKey(res.access, user.email);
    const privateKey = decrypted.startsWith('0x') ? decrypted : '0x' + decrypted;
    console.log("privateKey",privateKey);

    if (privateKey.length !== 76) throw new Error('Invalid private key format.');

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    if (!signedTx.rawTransaction) throw new Error('Signing failed');

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    await updateWithdraw({
      withdraw_id: res.data.id,
      txn_hash: receipt.transactionHash,
    });

    Swal.fire({
      title: 'Success!',
      html: 'BNB Transfer Complete.<br><b>Closing in <span id="timer">2</span> seconds...</b>',
      icon: 'success',
      timer: 2000,
      didOpen: () => {
        const timerElement = document.getElementById('timer');
        let timeLeft = 2;
        const interval = setInterval(() => {
          timeLeft--;
          if (timerElement) timerElement.textContent = timeLeft.toString();
        }, 1000);
      },
    });

    setTimeout(() => {
      window.location.reload();
    }, 2100);
  } catch (err) {
    console.error(err);
    toast.error(err.message || 'Transaction Failed.');
  }
};

