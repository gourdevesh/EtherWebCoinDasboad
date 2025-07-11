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
      <div className="rank-cards">
        <div className="rank-card pink-glow">
          <img src={previousRank?.image} alt="Previous Rank" />
          <div>
            <h5>Previous Rank</h5>
            <h5>{previousRank?.name || '-'}</h5>
          </div>
        </div>

        <div className="rank-card pink-glow">
          <img src={currentRank?.image} alt="Current Rank" />
          <div>
            <h5>Current Rank</h5>
            <h5>{currentRank?.name || '-'}</h5>
          </div>
        </div>

        <div className="rank-card pink-glow">
          <img src={nextRank?.image} alt="Next Rank" />
          <div>
            <h5>Upcoming Rank</h5>
            <h5>{nextRank?.name || '-'}</h5>
          </div>
        </div>
      </div>

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
                <th>Self Referral</th>
                <th>Team Business</th>
                <th>Power Leg</th>
                <th>Self Business</th>
                <th>Other Leg</th>
                <th>Reward</th>
                <th>Status</th>
                <th>Date Time</th>
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
                  <td>{item.self_referral || "NA"}</td>

                  <td>{item.team_business}</td>
                  <td>{item.power_leg}</td>
                  <td>{item.self_business}</td>
                  <td>{item.other_leg}</td>
                  <td>{item.reward}</td>
                  <td>
                    <span
                      className={`badge ${item.status === 'pending' ? 'bg-warning' : 'bg-success'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.date_time}</td>
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
