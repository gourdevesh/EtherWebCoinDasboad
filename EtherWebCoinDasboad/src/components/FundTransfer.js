import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CContainer,
    CRow,
    CCol,
    CButton,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CBadge,
    CSpinner,
    CPagination,
    CPaginationItem,
} from '@coreui/react';
import { FaExchangeAlt } from 'react-icons/fa';
import FundTransferModal from '../model/TransferNowModel';
import { getTransfers } from '../Services/FundTransferService';

const FundTransfer = () => {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchTransfers = async (currentPage = 1) => {
        setLoading(true);
        setError('');
        try {
            const data = await getTransfers(currentPage, perPage);
            setTransfers(data.data.transfers);
            setTotal(data.data.total);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransfers(page);
    }, [page]);

    const totalPages = Math.ceil(total / perPage);

    return (
        <div  >
          <CCard
  className="mb-4"
  style={{
    background: 'linear-gradient(to right, #a86b25, rgb(181, 111, 42))',
    color: '#fff',
  }}
>
  <CCardBody>
  <CRow className="align-items-center text-center text-md-start">
  {/* Icon */}
  <CCol xs={12} md="auto" className="mb-3 mb-md-0">
    <div
      style={{
        backgroundColor: '#fff',
        color: '#a86b25',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 auto',
      }}
    >
      <FaExchangeAlt />
    </div>
  </CCol>

  {/* Text + Button wrapper */}
  <CCol xs={12} md>
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
      <div>
        <h5 className="fw-bold mb-1 mb-md-0">Transfer Fund</h5>
        <p className="mb-0">
          You can transfer funds from your account to another account
        </p>
      </div>

      <div className="ms-md-auto">
        <CButton
          color="warning"
          className="text-black fw-bold"
          onClick={() => setShow(true)}
        >
          Transfer Now
        </CButton>
      </div>
    </div>
  </CCol>
</CRow>

  </CCardBody>
</CCard>

            {/* Transfer List */}
            {loading ? (
                <div className="text-center my-5">
                    <CSpinner color="primary" />
                </div>
            ) : error ? (
                <div className="text-danger text-center fw-bold">{error}</div>
            ) : (
                <>
                    <CCard style={{ border: 'none' }}>
                        <CCardHeader className="fw-bold dark-table">Fund Transfer List</CCardHeader>
                        <CCardBody className="dark-table" >
                            <CTable striped responsive hover className="dark-table" >
                                <CTableHead className="dark-table" >
                                    <CTableRow className="dark-table" >
                                        <CTableHeaderCell>#</CTableHeaderCell>
                                        <CTableHeaderCell>Receiver ID</CTableHeaderCell>
                                        <CTableHeaderCell>User Name</CTableHeaderCell>
                                        <CTableHeaderCell>Receiver Name</CTableHeaderCell>
                                        <CTableHeaderCell>Remain Amt</CTableHeaderCell>
                                        <CTableHeaderCell>Avl Amt</CTableHeaderCell>
                                        <CTableHeaderCell>Transfer Amt</CTableHeaderCell>
                                        <CTableHeaderCell>Date</CTableHeaderCell>
                                        <CTableHeaderCell>Status</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {transfers.length > 0 ? (
                                        transfers.map((item, index) => (
                                            <CTableRow key={item.id}>
                                                <CTableDataCell>{(page - 1) * perPage + index + 1}</CTableDataCell>
                                                <CTableDataCell>{item.receiver_id}</CTableDataCell>
                                                <CTableDataCell>{item.user_name}</CTableDataCell>
                                                <CTableDataCell>{item.receiver_name}</CTableDataCell>
                                                <CTableDataCell>${item.remain_amount}</CTableDataCell>
                                                <CTableDataCell>${item.avl_amount}</CTableDataCell>
                                                <CTableDataCell>${item.transfer_amount}</CTableDataCell>
                                                <CTableDataCell>{item.date_time}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CBadge color={item.status === 'success' ? 'success' : 'secondary'}>
                                                        {item.status}
                                                    </CBadge>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan={9} className="text-center text-muted py-4">
                                                No Transfer History Found
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}
                                </CTableBody>
                            </CTable>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <CPagination align="end" className="mt-3">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <CPaginationItem
                                            key={i}
                                            active={i + 1 === page}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {i + 1}
                                        </CPaginationItem>
                                    ))}
                                </CPagination>
                            )}
                        </CCardBody>
                    </CCard>
                </>
            )}

            <FundTransferModal show={show} handleClose={() => setShow(false)} />
        </div>
    );
};

export default FundTransfer;
