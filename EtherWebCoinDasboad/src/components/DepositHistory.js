import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react';
import DepositForm from './header/DepositForm';
import { checkZipwalletAndUpdate, getDeposits } from '../Services/depositService';
import { toast } from 'react-toastify';
import PaginationButtons from '../views/pages/PaginationButtons';

const DepositHistoryTable = () => {
  const [deposits, setDeposits] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const accessKey = 'Mj4V95yTzSQp7C8bCR57v9TF4yJxtdpj';
    const depositAsset = 'USDT';

    const hash = window.location.hash;
    if (hash.includes('?')) {
      const query = hash.split('?')[1];
      const params = new URLSearchParams(query);

      const txnId = params.get('txn_id');
      const clientId = params.get('client_id');

      if (txnId && clientId) {
        checkZipwalletAndUpdate({
          accessKey,
          depositAsset,
          clientId,
          txnId,
        })
          .then((res) => {
            if (res) {
              console.log('✅ Final deposit update done');
              window.location.reload();

            }
          })
          .catch((err) => {
            console.error('❌ Zipwallet check failed:', err.message);
          });
      }
    }
  }, []);


  const fetchDeposits = async (page = 1) => {
    try {
      const res = await getDeposits(page, 10);

      setDeposits(res.deposits);
      setPagination(res.pagination);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage]);

  console.log("deposits", deposits);

  return (
    <>
      {/* Deposit Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 col-lg-8">
          <DepositForm onDepositSuccess={() => fetchDeposits(currentPage)} />
        </div>
      </div>

      {/* Deposit History Table */}
      <div className="text-white p-3 rounded" style={{ backgroundColor: '#0B0730' }}>
        <CTable responsive borderless hover className="dark-table text-white">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>

              <CTableHeaderCell>Deposit Asset</CTableHeaderCell>
              <CTableHeaderCell>Deposit Amount</CTableHeaderCell>
              <CTableHeaderCell>Deposit Type</CTableHeaderCell>
              <CTableHeaderCell>From Address</CTableHeaderCell>
              <CTableHeaderCell>To Address</CTableHeaderCell>
              <CTableHeaderCell>Txn Hash</CTableHeaderCell>
              <CTableHeaderCell>Date Time</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {deposits?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{item.deposit_asset}</CTableDataCell>
                <CTableDataCell>{item.deposit_amount}</CTableDataCell>
                <CTableDataCell>{item.deposit_type}</CTableDataCell>
                <CTableDataCell>   {item.from_address
                  ? `${item.from_address.slice(0, 8)}....${item.from_address.slice(-6)}`
                  : 'NA'}
                </CTableDataCell>
                <CTableDataCell> <CTableDataCell>
                  {item.to_address
                    ? `${item.to_address.slice(0, 8)}....${item.to_address.slice(-6)}`
                    : 'NA'}
                </CTableDataCell>

                </CTableDataCell>
                <CTableDataCell>  {item.txn_hash
                  ? `${item.txn_hash.slice(0, 8)}....${item.txn_hash.slice(-6)}`
                  : 'NA'}</CTableDataCell>
                <CTableDataCell>{new Date(item.created_at).toLocaleString()}</CTableDataCell>
                <CTableDataCell><span
                  className={`badge ${item.status === 'pending' ? 'bg-warning' : 'bg-success'}`}
                >
                  {item.status}
                </span></CTableDataCell>

              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {pagination && (
          <PaginationButtons
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}

      </div>

    </>

  );
};

export default DepositHistoryTable;
