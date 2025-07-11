import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CBadge,
} from '@coreui/react'

const ReferralIncomeTable = () => {
  const dummyData = [
    {
      id: 1,
      referralUser: '0xAAABBB1234567890',
      amount: 100,
      date: '2025-07-08',
      status: 'credited',
    },
    {
      id: 2,
      referralUser: '0x9876543210ABCDEF',
      amount: 80,
      date: '2025-07-07',
      status: 'pending',
    },
  ]

  return (
    <CCard className='dark-table'>
      <CCardHeader className='dark-table'>
        <strong>Referral Income</strong>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive className='dark-table'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Referral User</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dummyData.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>
                  {item.referralUser.slice(0, 6)}...{item.referralUser.slice(-4)}
                </CTableDataCell>
                <CTableDataCell>${item.amount}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={item.status === 'credited' ? 'success' : 'warning'}>
                    {item.status}
                  </CBadge>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default ReferralIncomeTable
