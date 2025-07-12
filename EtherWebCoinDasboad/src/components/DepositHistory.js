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
              const cleanHash = window.location.hash.split('?')[0];
              window.history.replaceState(null, '', cleanHash);
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
      console.error('❌ Failed to fetch deposits:', err.message);
    }
  };
  useEffect(() => {
    fetchDeposits(currentPage);
  }, [currentPage]);


  return (
    <>
      {/* Deposit Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6 col-lg-8">
          <DepositForm onDepositSuccess={() => fetchDeposits(currentPage)} />
        </div>
      </div>

      <div className="text-white p-3 rounded" style={{ backgroundColor: '#0B0730' }}>
        <h5 className="mb-4 fw-semibold border-bottom pb-2">Deposit History</h5>
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
            {deposits && deposits.length > 0 ? (
              deposits.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{(pagination.currentPage -1) * pagination.perPage + index+ 1}</CTableDataCell>
                  <CTableDataCell>{item.deposit_asset}</CTableDataCell>
                  <CTableDataCell>{item.deposit_amount}</CTableDataCell>
                  <CTableDataCell>{item.deposit_type}</CTableDataCell>
                  <CTableDataCell>
                    {item.from_address
                      ? `${item.from_address.slice(0, 8)}....${item.from_address.slice(-6)}`
                      : 'NA'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.to_address
                      ? `${item.to_address.slice(0, 8)}....${item.to_address.slice(-6)}`
                      : 'NA'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.txn_hash
                      ? `${item.txn_hash.slice(0, 8)}....${item.txn_hash.slice(-6)}`
                      : 'NA'}
                  </CTableDataCell>
                  <CTableDataCell>{new Date(item.created_at).toLocaleString()}</CTableDataCell>
                  <CTableDataCell>
                    <span
                      className={`badge ${item.status === 'pending' ? 'bg-warning' : 'bg-success'
                        }`}
                    >
                      {item.status}
                    </span>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                  No Data Found
                </CTableDataCell>

              </CTableRow>
            )}
          </CTableBody>

        </CTable>

        {pagination && pagination.lastPage > 10 && (
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
