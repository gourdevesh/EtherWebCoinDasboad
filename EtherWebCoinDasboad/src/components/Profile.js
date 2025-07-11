import React, { useEffect, useRef, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CAvatar,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilShareAlt } from '@coreui/icons'
import { useAuth } from '../views/pages/context/AuthContext'
import { uploadProfileImage } from '../../src/Services/profileService'

const Profile = () => {
  const { authUser, refreshProfile } = useAuth()
  const fileInputRef = useRef(null)


  const user = authUser?.USER
  const [previewImage, setPreviewImage] = useState(null)

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const imageURL = URL.createObjectURL(file)
    setPreviewImage(imageURL)

    try {
      const token = localStorage.getItem('token')
      await uploadProfileImage(file, token)
      await refreshProfile()
    } catch (error) {
      console.error('Upload failed:', error.message || error)
    }
  }


  return (
    <CRow>
      <CCol md={4}>
        <CCard className="mb-4 text-white text-center shadow-sm" style={{ backgroundColor: '#0B0730' }}>
          <CCardBody className="p-0">
            <div className="text-white py-4 rounded-top position-relative" style={{ backgroundColor: '#151136' }}>
              <div
                style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
                onClick={handleAvatarClick}
              >
                <CAvatar
                  src={previewImage || user?.profile_image}
                  size="xl"
                  style={{
                    border: '1px solid #ffba00',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    width: '80px',
                    height: '80px', // optional: set fixed height
                    objectFit: 'cover',
                  }}
                />

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <span
                // style={{
                //   position: 'absolute',
                //   bottom: 0,
                //   right: -6,
                //   background: '#fff',
                //   borderRadius: '50%',
                //   padding: '2px',
                // }}
                >
                  {/* <CIcon icon={cilShareAlt} /> */}
                </span>
              </div>
              <h4 className="mt-2 mb-0">{user?.name}</h4>
              <small>Rank :- {user?.rank}</small>
            </div>
            <div className="py-3 px-4 text-start">
              <div className="mb-2">
                <strong>Email</strong>
                <div className="text">{user?.email}</div>
              </div>
              <div className="mb-2">
                <strong>Referral Code</strong>
                <div className="fw-bold">
                  <CIcon icon={cilShareAlt} className="me-2 text-success" />
                  {user?.my_code}
                </div>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <span><strong>Status</strong></span>
                <CBadge color="success">{user?.user_status}</CBadge>
              </div>
              <div className="mb-2 d-flex justify-content-between">
                <span><strong>Withdraw Status</strong></span>
                <CBadge color={user?.withdraw_status === 'enable' ? 'success' : 'danger'}>
                  {user?.withdraw_status}
                </CBadge>
              </div>
              <div className="mb-2">
                <strong>Join Date</strong>
                <div className="text">{user?.date_time}</div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Right Profile Info */}
      <CCol md={8}>
        <CCard className="mb-4 shadow-sm text-white" style={{ backgroundColor: '#0B0730' }}>
          <CCardHeader className="text-white" style={{ backgroundColor: '#151136' }}>
            <strong>Profile</strong>
          </CCardHeader>
          <CCardBody>
            <h5 className="mb-3 text-primary">Profile Setting</h5>

            <CRow className="mb-3 g-3">
              <CCol md={6}>
                <label className="text-white mb-2">Name</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.name} readOnly />
              </CCol>
              <CCol md={6}>
                <label className="text-white mb-2">Email</label>
                <input type="text" className="form-control dark-input " style={{ backgroundColor: '#151136' }} value={user?.email} readOnly />
              </CCol>
            </CRow>

            <CRow className="mb-3 g-3">
              <CCol md={6}>
                <label className="text-white mb-2">Referral Code</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.my_code} readOnly />
              </CCol>
              <CCol md={6}>
                <label className="text-white mb-2">Rank</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.rank} readOnly />
              </CCol>
            </CRow>

            <CRow className="mb-3 g-3">
              <CCol md={6}>
                <label className="text-white mb-2">Status</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.user_status} readOnly />
              </CCol>
              <CCol md={6}>
                <label className="text-white mb-2">Withdraw Status</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.withdraw_status} readOnly />
              </CCol>
            </CRow>

            <CRow className="mb-3 g-3">
              <CCol md={6}>
                <label className="text-white mb-2">My Stake</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.my_stake} readOnly />
              </CCol>
              <CCol md={6}>
                <label className="text-white mb-2">Total Income</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.total_income} readOnly />
              </CCol>
            </CRow>

            <CRow className="mb-3 g-3">
              <CCol md={6}>
                <label className="text-white mb-2">Available Amount</label>
                <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.available_amount} readOnly />
              </CCol>
              <CCol md={6}>
                <label className="text-white mb-2">Stake Income</label>
              <input type="text" className="form-control dark-input" style={{ backgroundColor: '#151136' }} value={user?.stake_income} readOnly />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
