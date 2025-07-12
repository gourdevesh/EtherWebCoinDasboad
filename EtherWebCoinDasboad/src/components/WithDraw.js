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
    CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWallet, cilMoney, cilDollar, cilSearch, cilCash } from '@coreui/icons';

import { FaExchangeAlt, FaEye, FaMoneyBillWave } from 'react-icons/fa';
import WithdrawRequestModal from '../model/WithdrawRequest';
import { getWithdrawList } from '../Services/WidthDrawServer';
import { useAuth } from '../views/pages/context/AuthContext';
import PaginationButtons from '../views/pages/PaginationButtons';

const WithDraw = () => {
    const [widthDrawData, setWidthData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const { authUser } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const totalPages = Math.ceil((widthDrawData?.data?.length || 0) / itemsPerPage)

    const paginatedData = widthDrawData?.data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const user = authUser?.USER
    const fetchWithdrawList = async () => {
        try {
            const data = await getWithdrawList();
            setWidthData(data);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawList();
    }, []);

    return (
        <div >
            <CCard
                className="mb-4"
                style={{
                    background: 'linear-gradient(to right, #a86b25, rgb(181, 111, 42))',
                    color: '#fff',
                }}
            >
                <CCardBody>
                    <CRow className="align-items-center g-3 text-center text-sm-start">

                        {/* Icon */}
                        <CCol xs={12} sm={1} className="d-flex justify-content-center justify-content-sm-start">
                            <div
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#a86b25',
                                    borderRadius: '50%',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <FaExchangeAlt />
                            </div>
                        </CCol>

                        {/* Text */}
                        <CCol xs={12} sm={7}>
                            <h5 className="fw-bold mb-1">Available Amount</h5>
                            <p className="mb-0">{user?.available_amount || 0}</p>
                        </CCol>

                        {/* Button */}
                        <CCol xs={12} sm={4}>
                            <div className="d-flex justify-content-center justify-content-sm-end">
                                <CButton
                                    color="warning"
                                    className="text-black fw-bold d-flex align-items-center gap-2 px-3 py-2"
                                    onClick={() => setVisible(true)}
                                    style={{ fontSize: '0.875rem', minWidth: '150px' }}
                                >
                                    <FaMoneyBillWave size={16} />
                                    Withdraw Now
                                </CButton>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            {loading ? (
                <div className="text-center my-5">
                    <CSpinner color="primary" />
                </div>
            ) : error ? (
                <div className="text-danger text-center fw-bold">{error}</div>
            ) : (
                <>
                    <CRow className="mb-4">
                        <CCol md={6} className="mb-3" >
                            <CCard className="h-100" style={{ backgroundColor: '#1d1e48', color: '#fff' }}>
                                <CCardBody>
                                    <CRow className="align-items-center g-0">
                                        <CCol xs="auto">
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '50%',
                                                    width: '60px',
                                                    height: '60px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <CIcon icon={cilCash} size="xl" className="text-primary" />
                                            </div>
                                        </CCol>

                                        <CCol className="ps-0" style={{ marginLeft: '10px', fontSize: '14px' }}>
                                            <p className="mb-1 fw-bold">Total Amount</p>
                                            <h6 className="fw-bold mb-0">$ {user?.total_income || 0}</h6>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>


                        {/* Withdraw Amount */}
                        <CCol md={6} className="mb-3">
                            <CCard className="h-100 " style={{ backgroundColor: '#1d1e48', color: '#fff' }} >
                                <CCardBody>
                                    <CRow className="align-items-center g-0">
                                        <CCol xs="auto">
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '50%',
                                                    width: '60px',
                                                    height: '60px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
                                                }}
                                            >
                                                <CIcon icon={cilWallet} size="xl" className="text-primary" />
                                            </div>
                                        </CCol>

                                        <CCol className="ps-0" style={{ marginLeft: '10px', fontSize: '14px' }}>
                                            <p className="mb-1 fw-bold">Withdraw Amount</p>
                                            <h6 className="fw-bold mb-0">$ {user?.withdraw_amount || 0}</h6>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>

                    <CCard style={{ border: 'none' }}>
                        <CCardHeader className="fw-bold dark-table">Withdraw History

                        </CCardHeader>
                        <CCardBody className='dark-table'>
                            <CTable striped responsive hover className='dark-table'>
                                <CTableHead className="dark-table">
                                    <CTableRow>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>#</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Available Amount</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Remain Amount</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Withdraw Amount</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Paid Amount</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Fees</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>From Address</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>To Address</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Txn Hash</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Date Time</CTableHeaderCell>
                                        <CTableHeaderCell style={{ whiteSpace: 'nowrap' }}>Status</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>

                                <CTableBody className='dark-table'>
                                    {paginatedData && paginatedData.length > 0 ? (
                                        paginatedData.map((item, index) => (
                                            <CTableRow key={item.id || index}>
                                                <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
                                                <CTableDataCell>${item.available_amount}</CTableDataCell>
                                                <CTableDataCell>${item.remain_amount}</CTableDataCell>
                                                <CTableDataCell>${item.withdraw_amount}</CTableDataCell>
                                                <CTableDataCell>${item.paid_amount}</CTableDataCell>
                                                <CTableDataCell>${item.fees_deduction}</CTableDataCell>
                                                <CTableDataCell style={{ maxWidth: 100, wordBreak: 'break-all' }} title={item.from_address}>
                                                    {item.from_address?.slice(0, 8)}....{item.from_address?.slice(-6)}
                                                </CTableDataCell>

                                                <CTableDataCell style={{ maxWidth: 100, wordBreak: 'break-all' }}>
                                                    {item.to_address?.slice(0, 8)}....{item.to_address?.slice(-6)}
                                                </CTableDataCell>
                                                <CTableDataCell>
                                                    {item.txn_hash ? (
                                                        <span style={{ wordBreak: 'break-all' }}> {item.txn_hash?.slice(0, 8)}....{item.txn_hash?.slice(-6)} </span>
                                                    ) : (
                                                        <CBadge color="warning">Not Available</CBadge>
                                                    )}
                                                </CTableDataCell>
                                                <CTableDataCell>{item.date_time}</CTableDataCell>
                                                <CTableDataCell>
                                                    <CBadge color={item.status === 'pending' ? 'warning' : item.status === 'completed' ? 'success' : 'secondary'}>
                                                        {item.status}
                                                    </CBadge>
                                                </CTableDataCell>
                                            </CTableRow>
                                        ))
                                    ) : (
                                        <CTableRow>
                                            <CTableDataCell colSpan="11" className="text-center text-muted py-4">
                                                No Data Found
                                            </CTableDataCell>
                                        </CTableRow>
                                    )}

                                </CTableBody>
                            </CTable>
                            {totalPages > 1 && (
                                <PaginationButtons
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            )}

                        </CCardBody>
                    </CCard>

                </>
            )}
            <WithdrawRequestModal visible={visible} setVisible={setVisible} fetchWithdrawList={fetchWithdrawList} />
        </div>
    );
};

export default WithDraw;
