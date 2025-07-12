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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWallet, cilMoney, cilDollar } from '@coreui/icons';
import { stake } from '../Services/stake';
import StakeDetailsModal from '../model/StakeDetailsModal';
import StakeCreateModal from '../model/StakeCreate';
import { FaEye } from 'react-icons/fa';
import PaginationButtons from '../views/pages/PaginationButtons';
import { useAuth } from '../views/pages/context/AuthContext';

const Stake = () => {
  const [stakeData, setStakeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil((stakeData?.data?.length || 0) / itemsPerPage)
  const paginatedData = stakeData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const { authUser } = useAuth()
  const user = authUser?.USER
  const handleViewDetails = (item) => {
    setSelectedStake(item);
    setVisible(true);
  };
  const fetchStakeData = async () => {
    try {
      const data = await stake();
      setStakeData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStakeData();
  }, []);

  return (
    <>
      {/* Banner */}
      <CCard className="mb-4 banner-card">
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start gap-3">
                <div>
                  <p className="mb-0">Available Amount: ${user?.available_amount || 0}</p>

                  <p className="mb-0">Earn rewards by staking your assets</p>
                </div>

                <CButton
                  color="warning"
                  className="text-black fw-bold"
                  onClick={() => setShow(true)}
                >
                  Stake Now
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>


      {/* Content */}
      {loading ? (
        <div className="text-center my-5">
          <CSpinner color="primary" />
        </div>
      ) : error ? (
        <div className="text-danger text-center fw-bold">{error}</div>
      ) : (
        <>
          {/* Summary Cards */}
          <CRow className="mb-4">
            {[
              {
                title: 'Active Stake',
                value: stakeData?.stake_amount ?? 0,
                icon: cilWallet,
                color: 'text-primary',
              },
              {
                title: 'Total Stake',
                value: stakeData?.stake_income ?? 0,
                icon: cilMoney,
                color: 'text-warning',
              },
              {
                title: 'Total Income',
                value: stakeData?.remain_income ?? 0,
                icon: cilDollar,
                color: 'text-success',
              },
            ].map((card, idx) => (
              <CCol md={4} className="mb-3" key={idx}>
                <CCard className="h-100 card-custom">
                  <CCardBody>
                    <CRow className="align-items-center">
                      <CCol xs={3}>
                        <CIcon icon={card.icon} size="xxl" className={card.color} />
                      </CCol>
                      <CCol>
                        <p className="mb-1 fw-bold">{card.title}</p>
                        <h5 className="fw-bold">${card.value}</h5>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>

          {/* Table Section */}
          <CCard className="table-card" style={{ backgroundColor: '#151136' }}>
            <CCardHeader className="fw-bold text-white">Stake List</CCardHeader>
            <CCardBody>
              <div className="table-responsive-custom">
                <CTable striped hover className="dark-table min-width-table">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>#</CTableHeaderCell>
                      <CTableHeaderCell>Stake Amount</CTableHeaderCell>
                      <CTableHeaderCell>Daily Reward</CTableHeaderCell>
                      <CTableHeaderCell>Daily Credit</CTableHeaderCell>
                      <CTableHeaderCell>Total Credit</CTableHeaderCell>
                      <CTableHeaderCell>Stake Date</CTableHeaderCell>
                      <CTableHeaderCell>Last Update</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {paginatedData?.length > 0 ? (
                      paginatedData?.map((item, index) => (
                        <CTableRow key={item.id || index}>
                          <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
                          <CTableDataCell>${item.stake_amount}</CTableDataCell>

                          <CTableDataCell>{item.daily_reward_percentage}%</CTableDataCell>
                          <CTableDataCell>${item.daily_credit_reward}</CTableDataCell>
                          <CTableDataCell>${item.total_credit}</CTableDataCell>
                          <CTableDataCell>{item.date_time}</CTableDataCell>
                          <CTableDataCell>{item.last_update}</CTableDataCell>
                          <CTableDataCell>
                            <CBadge color={item.stake_status === 'active' ? 'success' : 'secondary'}>
                              {item.stake_status}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary" size="sm" onClick={() => handleViewDetails(item)}>
                              <FaEye />
                            </CButton>
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
              </div>
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

      <StakeDetailsModal visible={visible} onClose={() => setVisible(false)} data={selectedStake} />
      <StakeCreateModal visible={show} onClose={() => setShow(false)} fetchStakeData={fetchStakeData} />

    </>
  );
};

export default Stake;
