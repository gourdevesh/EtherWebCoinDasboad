import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react';

const StakeDetailsModal = ({ visible, onClose, data }) => {
  if (!data) return null;

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Stake Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable bordered responsive>
          <CTableBody>
            <CTableRow>
              <CTableDataCell><strong>Stake Amount</strong></CTableDataCell>
              <CTableDataCell>${data.stake_amount}</CTableDataCell>
              <CTableDataCell><strong>Monthly Reward %</strong></CTableDataCell>
              <CTableDataCell>{data.daily_reward_percentage}%</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Stake Capping</strong></CTableDataCell>
              <CTableDataCell>{data.stake_capping_x} X</CTableDataCell>
              <CTableDataCell><strong>Stake Capping Value</strong></CTableDataCell>
              <CTableDataCell>${data.stake_capping_value}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Income Capping</strong></CTableDataCell>
              <CTableDataCell>{data.income_capping_x}X</CTableDataCell>
              <CTableDataCell><strong>Income Capping Value</strong></CTableDataCell>
              <CTableDataCell>${data.income_capping_value}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Daily Credit</strong></CTableDataCell>
              <CTableDataCell>${data.daily_credit_reward}</CTableDataCell>
              <CTableDataCell><strong>Total Credit</strong></CTableDataCell>
              <CTableDataCell>${data.total_credit}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Stake Age</strong></CTableDataCell>
              <CTableDataCell>{data.stake_age}</CTableDataCell>
              <CTableDataCell><strong>Last Update</strong></CTableDataCell>
              <CTableDataCell>{data.last_update}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Direct Income</strong></CTableDataCell>
              <CTableDataCell>${data.direct_income}</CTableDataCell>
              <CTableDataCell><strong>Level Income</strong></CTableDataCell>
              <CTableDataCell>${data.level_income}</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Total Income</strong></CTableDataCell>
              <CTableDataCell>${data.total_income}</CTableDataCell>
              <CTableDataCell><strong>Stake Status</strong></CTableDataCell>
              <CTableDataCell>
                <CBadge color={data.stake_status === 'active' ? 'success' : 'secondary'}>
                  {data.stake_status}
                </CBadge>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><strong>Stake Date</strong></CTableDataCell>
              <CTableDataCell colSpan={3}>{data.date_time}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onClose}>Close</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default StakeDetailsModal;
