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

const TeamBusinessTable = () => {
  const dummyData = [
    {
      id: 1,
      teamMember: '0xF1F2F3AABBCCDDEE',
      businessVolume: 500,
      level: 'Level 1',
      date: '2025-07-08',
      status: 'active',
    },
    {
      id: 2,
      teamMember: '0x12345678DEADBEEF',
      businessVolume: 300,
      level: 'Level 2',
      date: '2025-07-07',
      status: 'inactive',
    },
  ]

  return (
    <CCard className='dark-table'>
      <CCardHeader className='dark-table'>
        <strong>Team Business</strong>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive className='dark-table'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Team Member</CTableHeaderCell>
              <CTableHeaderCell>Level</CTableHeaderCell>
              <CTableHeaderCell>Business Volume</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {dummyData.map((item, index) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>
                  {item.teamMember.slice(0, 6)}...{item.teamMember.slice(-4)}
                </CTableDataCell>
                <CTableDataCell>{item.level}</CTableDataCell>
                <CTableDataCell>${item.businessVolume}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={item.status === 'active' ? 'success' : 'secondary'}>
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

export default TeamBusinessTable
