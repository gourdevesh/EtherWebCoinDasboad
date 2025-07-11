import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilShareAlt,
} from '@coreui/icons'
import { useAuth } from '../pages/context/AuthContext'
import bunnyEgg from 'src/assets/images/bunnyEgg.webp'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { authUser } = useAuth()
  const user = authUser?.USER
  const navigate = useNavigate()
  const handleCopyShare = async () => {
    const code = user?.my_code || ''
    const referralUrl = `http://localhost:4000/#/register?ref=${code}`
    try {
      await navigator.clipboard.writeText(referralUrl)
      if (navigator.share) {
        await navigator.share({
          title: 'Join BetaChainX',
          text: `Register now using my referral code!`,
          url: referralUrl,
        })
      }
      toast.success('Referral link copied')
    } catch (err) {
      console.error('Copy/Share failed:', err)
      toast.error('Something went wrong while copying or sharing.')
    }
  }

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
    <>
      <CCard
        className="mb-4"
        style={{
          background: 'linear-gradient(to right, #3b2b1f, #1f1a16)',
          border: 'none',
          color: '#fff',
        }}
      >
        <CCardBody className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <CIcon icon={cilShareAlt} size="xxl" />
            </div>
            <div>
              <div className="fw-bold fs-5">Referral Code</div>
              <div>{user?.my_code || '-'}</div>
            </div>
          </div>
          <CButton color="light" className="text-dark fw-semibold" onClick={handleCopyShare}>
            Copy / Share
          </CButton>
        </CCardBody>
      </CCard>

      <CCard
        className="mb-4"
        style={{
          background: 'linear-gradient(to right, #a86b25, rgb(181, 111, 42))',
          color: '#fff',
          borderRadius: '10px',
          border: 'none',
        }}
      >
        <CCardBody className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div
              className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <img src={bunnyEgg} alt="rank" width={40} />
            </div>
            <div className="fw-bold fs-5">My Rank</div>
          </div>
          <div className="fw-semibold">{user?.rank || '-'}</div>
        </CCardBody>
      </CCard>

      <CRow className="mb-4">
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

      </CRow>
    </>
  )
}

export default Dashboard
