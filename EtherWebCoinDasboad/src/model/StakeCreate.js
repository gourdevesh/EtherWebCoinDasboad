import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCol,
  CRow,
  CSpinner,
  CFormFeedback,
} from '@coreui/react'
import { submitStake } from '../Services/stake'
import { toast } from 'react-toastify'

const StakeCreateModal = ({ visible, onClose, fetchStakeData }) => {
  const [stakeAmount, setStakeAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [stakeReturn, setStakeReturn] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stakeAmount) return toast.warning('Please enter a stake amount')
    if (error) return toast.error(error)  

    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const res = await submitStake(stakeAmount, token)
      if (res?.status) {
        toast.success(res.message || 'Stake submitted successfully!')
        onClose()
        fetchStakeData()
        setStakeAmount('')
      } else {
        toast.error(res.message || 'Stake submission failed')
      }

    } catch (error) {
      toast.error(error?.message || 'Failed to submit stake')
    } finally {
      setIsLoading(false)
    }
  }



  const handleAmountChange = (e) => {
    const value = e.target.value
    setStakeAmount(value)
    const numericValue = parseInt(value, 10)
    if (
      numericValue % 50 !== 0 ||
      numericValue < 50 ||
      numericValue > 10000
    ) {
      setError('Enter 50, 100, 150 ... up to 10000')
    } else {
      setError('')
    }
  }


  return (
    <CModal visible={visible} onClose={onClose} size="md" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>Stake Create</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CCard className="border-0 shadow-none">
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol xs={12}>
                  <CFormLabel htmlFor="stakeAmount">Stake Amount</CFormLabel>
                  <CFormInput
                    type="number"
                    id="stakeAmount"
                    value={stakeAmount}
                    onChange={handleAmountChange}
                    placeholder="Enter stake amount"
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-4">
                <CCol xs={12}>
                  <CFormLabel>Stake Package </CFormLabel>
                  <CFormInput
                    type="text"
                    placeholder="50, 100, 150, 200 ..., 10000"
                    readOnly
                  />
                </CCol>
              </CRow>


              <CRow className="mt-3">
                <CCol xs={12}>
                  <CButton type="submit" color="primary" className="w-100" disabled={isLoading}>
                    {isLoading ? <>   <CSpinner size="sm" className="me-2" />
                      Submitting...   </> : 'Submit Stake'}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  )
}

export default StakeCreateModal
