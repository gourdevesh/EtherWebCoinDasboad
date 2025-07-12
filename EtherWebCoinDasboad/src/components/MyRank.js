import React, { useEffect, useState } from 'react'
import { myRank } from '../Services/myRankService'

const MyRank = () => {
  const [rankList, setRankList] = useState([])
  const [loading, setLoading] = useState(true)
  const [previousRank, setPreviousRank] = useState(null)
  const [currentRank, setCurrentRank] = useState(null)
  const [nextRank, setNextRank] = useState(null)

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await myRank()
        setRankList(response?.ranks || [])
        setPreviousRank(response?.previous_rank)
        setCurrentRank(response?.current_rank)
        setNextRank(response?.next_rank)
      } catch (error) {
        console.error('Failed to fetch rank data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRank()
  }, [])

  return (
    <div>

      {/* ===== Rank Table ===== */}
      <div className="rank-list mt-4">
        <h4>Rank List</h4>
        <div className="table-responsive-custom">
          <table className="table table-bordered table-striped dark-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Icon</th>
                <th>Rank Name</th>
                <th>Direct Referral</th>
                <th>Team Size</th>

                <th>Condition</th>


                <th>Team Business</th>

                <th>Reward</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rankList.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.rank_image}
                      alt={item.rank_name}
                      style={{ width: '40px', height: '40px' }}
                    />
                  </td>
                  <td>{item.rank_name}</td>
                  <td>{item.direct_referral || "NA"}</td>
                  <td>{item.team_size || "NA"}</td>
                  <td>{item.condition}</td>
                  <td>${item.team_business}</td>
                  <td>${item.reward || 0}</td>
                  <td>
                    <span
                      className={`badge ${item.status === 'pending' ? 'bg-warning' : 'bg-success'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default MyRank
