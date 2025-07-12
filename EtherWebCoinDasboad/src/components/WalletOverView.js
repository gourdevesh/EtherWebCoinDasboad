import React from 'react'
import { FaWallet, FaHourglassHalf, FaHandHoldingUsd, FaHandshake, FaRocket, FaChartBar, FaGlobe, FaTrophy } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../views/pages/context/AuthContext'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

const WalletOverview = () => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const user = authUser?.USER
  const StatCard = ({ icon, label, value, bg, onClick }) => (
    <CCol xs={12} sm={6} md={4} lg={4} className="mb-4">
      <CCard
        onClick={onClick}
        style={{
          borderRadius: '16px',
          padding: '1px',
          minHeight: '120px',
          boxShadow: '0 4px 12px rgba(64, 55, 55, 0.15)',
          backgroundColor: '#1C1D3A',
          color: 'white',
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        <CCardBody className="d-flex align-items-center text-white">
          <div
            className={`${bg} d-flex align-items-center justify-content-center rounded-circle me-3`}
            style={{ width: 80, height: 80 }}
          >
            <img src={icon} alt="icon" width={50} onError={(e) => e.target.style.display = 'none'} />

          </div>
          <div>
            <div className="fw-semibold text-white" style={{ fontSize: '18px' }}>
              {label}
            </div>
            <div className="fw-bold text-white" style={{ fontSize: '16px' }}>
              ${parseFloat(value || 0).toFixed(2)}
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  )
  return (
    <div >
      <div className="top-card">
        <div className="wallet-info">
          <FaWallet className="wallet-icon" />
          <div>
            <p className="wallet-label">Available Amount</p>
            <h5>${user?.available_amount || 0}</h5>
          </div>
        </div>
        <button className="add-button" onClick={() => navigate('/deposit')}>Add Amount</button>
      </div>


      <CRow className="mb-4">
        <StatCard icon="src/assets/images/UserDashboardIcons/AvailableAmount.png" label="Available Amount" value={user?.available_amount} bg="bg-primary bg-opacity-10" />
        <StatCard icon="src/assets/images/UserDashboardIcons/5.png" label="Total Withdraw" value={user?.withdraw_amount} bg="bg-warning bg-opacity-25" />
        <StatCard icon="src/assets/images/UserDashboardIcons/RankIncome.png" label="My Business" value={user?.my_business} bg="bg-danger bg-opacity-10" />
        <StatCard icon="src/assets/images/UserDashboardIcons/TeamBusiness.png" label="Team Business" value={user?.team_business} bg="bg-danger bg-opacity-10" onClick={() => navigate('/team-business')} />
        <StatCard icon="src/assets/images/userdashboardicons/mystake.png" label="My Stake" value={user?.my_stake} bg="bg-success bg-opacity-25" onClick={() => navigate('/stake')}
        />
        <StatCard icon="src/assets/images/UserDashboardIcons/MyStakeReward.png" label="My Stake Reward" value={user?.stake_income} bg="bg-warning bg-opacity-25" />
        <StatCard icon="src/assets/images/UserDashboardIcons/TotalIncome.png" label="Total Income" value={user?.total_income} bg="bg-success bg-opacity-25" />
        <StatCard icon="src/assets/images/UserDashboardIcons/RankIncome.png" label="Rank Income" value={user?.rank_reward} bg="bg-info bg-opacity-25" onClick={() => navigate('/my-rank')} />
        <StatCard icon="src/assets/images/UserDashboardIcons/LevelIncome.png" label="Level Income" value={user?.level_income} bg="bg-danger bg-opacity-10" onClick={() => navigate('/level-income')} />
        <StatCard icon="src/assets/images/UserDashboardIcons/ReferralIncome.png" label="Referral Income" value={user?.direct_income} bg="bg-danger bg-opacity-25" onClick={() => navigate('/referral-income')} />

      </CRow>


    </div>
  )
}

export default WalletOverview
