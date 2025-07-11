import React, { useEffect, useState } from 'react'
import {
  CCard, CCardBody, CRow, CCol, CNav, CNavItem, CNavLink,
  CTabContent, CTabPane, CButton, CTable, CTableHead,
  CTableBody, CTableRow, CTableHeaderCell, CTableDataCell,
  CModal, CModalHeader, CModalBody, CModalTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUserFollow, cilUser, cilGroup } from '@coreui/icons'
import { myReferral, myTeam } from '../Services/myTeamService'

const MyTeam = () => {
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedLevelUsers, setSelectedLevelUsers] = useState([])
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [activeTab, setActiveTab] = useState('direct')
  const [loading, setLoading] = useState(true)
  const [teamData, setTeamData] = useState([])
  const [referralData, setReferralData] = useState([])

  const getRowBg = (i) => ({ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f7f7f9' })

  const handleViewUsers = (level, users) => {
    setSelectedLevel(level)
    setSelectedLevelUsers(users)
    setVisibleModal(true)
  }

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const res = await myTeam()
        const groupedLevels = {}
        res.data.allTeamData.forEach((user) => {
          if (!groupedLevels[user.level]) groupedLevels[user.level] = []
          groupedLevels[user.level].push(user)
        })
        const transformedLevels = Object.entries(groupedLevels).map(([level, users]) => ({
          level: Number(level),
          users
        })).sort((a, b) => a.level - b.level)

        setTeamData({
          levels: transformedLevels,
          directReferral: 0,
          activeReferral: 0,
          team: res.data.allTeamData.length
        })
      } catch (err) {
        console.error('Error fetching team data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadTeamData()
  }, [])

  useEffect(() => {
    const loadReferralData = async () => {
      try {
        const data = await myReferral()
        setReferralData(data)
      } catch (err) {
        console.error('Error fetching referral data:', err)
      }
    }
    loadReferralData()
  }, [])

  return (
    <>
      <CRow className="mb-4 g-3">
  <CCol xs={12} sm={4}>
    <CCard className="border-pink shadow-sm dark-card" style={{ minHeight: '90px' }}>
      <CCardBody className="d-flex align-items-center gap-4">
        <div className="icon-circle bg-light-purple text-primary d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', fontSize: '30px' }}>
          <CIcon icon={cilUserFollow} size="xxl" />
        </div>
        <div>
          <h5 className="mb-1" style={{ fontSize: '18px' }}>Direct Referral</h5>
          <strong style={{ fontSize: '22px' }}>{teamData.directReferral}</strong>
        </div>
      </CCardBody>
    </CCard>
  </CCol>

  <CCol xs={12} sm={4}>
    <CCard className="border-pink shadow-sm dark-card" style={{ minHeight: '90px' }}>
      <CCardBody className="d-flex align-items-center gap-4">
        <div className="icon-circle bg-light-warning text-warning d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', fontSize: '30px' }}>
          <CIcon icon={cilUser} size="xxl" />
        </div>
        <div>
          <h5 className="mb-1" style={{ fontSize: '18px' }}>Active Referral</h5>
          <strong style={{ fontSize: '22px' }}>{teamData.activeReferral}</strong>
        </div>
      </CCardBody>
    </CCard>
  </CCol>

  <CCol xs={12} sm={4}>
    <CCard className="border-pink shadow-sm dark-card" style={{ minHeight: '9px' }}>
      <CCardBody className="d-flex align-items-center gap-4">
        <div className="icon-circle bg-light-info text-info d-flex justify-content-center align-items-center" style={{ width: '60px', height: '60px', fontSize: '30px' }}>
          <CIcon icon={cilGroup} size="xxl" />
        </div>
        <div>
          <h5 className="mb-1" style={{ fontSize: '18px' }}>Team</h5>
          <strong style={{ fontSize: '22px' }}>{teamData.team}</strong>
        </div>
      </CCardBody>
    </CCard>
  </CCol>
</CRow>

      <div style={{ padding: "20px", height: "auto" }} className='dark-table'>

    <CNav className="custom-tabs dark-table" style={{color:"white"}}>
  <CNavItem >
    <CNavLink 
    style={{color:"white"}}
      className={activeTab === 'direct' ? 'active' : ''}
      onClick={() => setActiveTab('direct')}
    >
      Direct
    </CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink
    style={{color:"white"}}
      className={activeTab === 'team' ? 'active' : ''}
      onClick={() => setActiveTab('team')}
    >
      Team
    </CNavLink>
  </CNavItem>
  <CNavItem>
    <CNavLink
    style={{color:"white"}}
      className={activeTab === 'active' ? 'active' : ''}
      onClick={() => setActiveTab('active')}
    >
      Active
    </CNavLink>
  </CNavItem>
</CNav>



        <CTabContent className="dark-table">
          <CTabPane visible={activeTab === 'team'}>
            <CTable hover className="mt-3 dark-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Level</CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {teamData.levels?.length > 0 ? (
                  teamData.levels.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={getRowBg(index)}>{item.level}</CTableDataCell>
                      <CTableDataCell style={getRowBg(index)}>{item.users.length}</CTableDataCell>
                      <CTableDataCell style={{ ...getRowBg(index) }} >

                        <CButton
                          size="sm"
                          style={{ backgroundColor: '#00ADA3', borderColor: '#00ADA3', color: '#fff' }}
                          onClick={() => handleViewUsers(item.level, item.users)}
                        >
                          View
                        </CButton>

                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                      No Data Found
                    </CTableDataCell>                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            <CModal visible={visibleModal} onClose={() => setVisibleModal(false)} size="lg">
              <CModalHeader onClose={() => setVisibleModal(false)}>
                <CModalTitle>Level {selectedLevel} Users</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {selectedLevelUsers.length > 0 ? (
                  <CTable striped hover responsive className='dark-table'>
                    <CTableHead>
                      <CTableRow  >
                        <CTableHeaderCell>#</CTableHeaderCell>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Level</CTableHeaderCell>
                        <CTableHeaderCell>Join Date</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {selectedLevelUsers.map((user, idx) => (
                        <CTableRow key={idx}>
                          <CTableDataCell style={getRowBg(idx)}>{idx + 1}</CTableDataCell>
                          <CTableDataCell style={getRowBg(idx)}>{user.name}</CTableDataCell>
                          <CTableDataCell style={getRowBg(idx)}>{user.level}</CTableDataCell>
                          <CTableDataCell style={getRowBg(idx)}>{new Date(user.join_date).toLocaleDateString()}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                ) : (
                  <div>No users found in this level.</div>
                )}
              </CModalBody>
            </CModal>
          </CTabPane>

          <CTabPane visible={activeTab === 'direct'}>
            {referralData?.data?.length > 0 ? (
              <CTable hover className="mt-3 dark-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {referralData.data.map((user, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell style={getRowBg(idx)}>
                        <img src={user.profile_image} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      </CTableDataCell>
                      <CTableDataCell style={getRowBg(idx)}>{user.name}</CTableDataCell>
                      <CTableDataCell style={getRowBg(idx)}>{user.email}</CTableDataCell>
                      <CTableDataCell style={getRowBg(idx)}>
                        <span className={`badge bg-${user.stake_status === 'pending' ? 'warning' : 'success'}`}>
                          {user.stake_status}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell style={getRowBg(idx)}>{new Date(user.created_at).toLocaleDateString()}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <div className="mt-3">No direct referral data</div>
            )}
          </CTabPane>

          <CTabPane visible={activeTab === 'active'} className='dark-table'>
            <div className="mt-3">No active referral data</div>
          </CTabPane>
        </CTabContent>
      </div>
    </>
  )
}

export default MyTeam
