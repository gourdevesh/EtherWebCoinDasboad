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

const Stake = () => {
  const [stakeData, setStakeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);

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
    <CContainer fluid className="stake-container p-4">
      {/* Banner */}
      <CCard className="mb-4 banner-card">
        <CCardBody>
          <CRow className="align-items-center justify-content-between">
            <CCol md={8}>
              <h5 className="fw-bold mb-1">Stake Now</h5>
              <p className="mb-0">Earn rewards by staking your assets</p>
            </CCol>
            <CCol md="auto">
              <CButton color="warning" className="text-black fw-bold" onClick={() => setShow(true)}>
                Stake Now
              </CButton>
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
                title: 'My Stake',
                value: stakeData?.stake_amount ?? 0,
                icon: cilWallet,
                color: 'text-primary',
              },
              {
                title: 'Stake Income',
                value: stakeData?.stake_income ?? 0,
                icon: cilMoney,
                color: 'text-warning',
              },
              {
                title: 'Remain Income',
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
                    {stakeData?.data?.length > 0 ? (
                      stakeData.data.map((item, index) => (
                        <CTableRow key={item.id || index}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
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
            </CCardBody>
          </CCard>
        </>
      )}

      <StakeDetailsModal visible={visible} onClose={() => setVisible(false)} data={selectedStake} />
      <StakeCreateModal visible={show} onClose={() => setShow(false)} fetchStakeData={fetchStakeData} />
    </CContainer>
  );
};

export default Stake;
