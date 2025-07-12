import React, { useEffect, useState } from 'react'
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
  CSpinner,
} from '@coreui/react'
import { toast } from 'react-toastify'
import { myTeam } from '../Services/myTeamService'
import PaginationButtons from '../views/pages/PaginationButtons'

const LevelIncomeTable = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [levelCounts, setLevelCounts] = useState({})
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await myTeam()
        const teamList = response?.data?.allTeamData || []
        const levelCountData = response?.data?.levelCounts || {}
        setData(teamList)
        setFilteredData(teamList)
        setLevelCounts(levelCountData)
      } catch (err) {
        console.error('Error fetching team data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTeam()
  }, [])

  const handleFilter = (level) => {
    setCurrentPage(1)
    if (!level) {
      setFilteredData(data)
    } else {
      const filtered = data.filter((item) => item.level?.toString() === level.toString())
      setFilteredData(filtered)
    }
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CCard className="dark-table">
      <CCardHeader className="dark-table d-flex justify-content-between align-items-center">
        <strong>Level Income Table</strong>
        {/* <select className="form-select w-auto" onChange={(e) => handleFilter(e.target.value)}>
          <option value="">All Levels</option>
          {Object.entries(levelCounts).map(([level, count]) => (
            <option key={level} value={level}>
              Level {level} ({count})
            </option>
          ))}
        </select> */}
      </CCardHeader>

      <CCardBody>
        {loading ? (
          <div className="text-center my-4">
            <CSpinner color="primary" />
          </div>
        ) : (
          <>
                        <div className="table-responsive-custom">

            <CTable striped hover responsive className="dark-table " >
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Level</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>User ID</CTableHeaderCell>
                  <CTableHeaderCell>Sponsor ID</CTableHeaderCell>
                  <CTableHeaderCell>Join Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {/* <CTableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <CTableRow key={item.id || index}>
                      <CTableDataCell>{(currentPage - 1) * itemsPerPage + index + 1}</CTableDataCell>
                      <CTableDataCell>Level {item.level}</CTableDataCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.user_id}</CTableDataCell>
                      <CTableDataCell>{item.sponsor_id}</CTableDataCell>
                      <CTableDataCell>{item.join_date}</CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={6} className="text-center">
                      No data available
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody> */}
            </CTable>
</div>
            {/* {totalPages > 1 && (
                <PaginationButtons
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
            )} */}
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default LevelIncomeTable
