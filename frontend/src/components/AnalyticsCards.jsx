import './AnalyticsCards.css'

const AnalyticsCards = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="analytics-cards">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="analytics-card loading-card">
            <div className="card-skeleton"></div>
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: 'Total Feedbacks',
      value: stats.totalFeedbacks,
      icon: '📊',
      color: '#667eea'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(2) : '0.00',
      icon: '⭐',
      color: '#f59e0b'
    },
    {
      title: 'Positive (4+)',
      value: stats.positiveFeedbacks,
      icon: '👍',
      color: '#10b981'
    },
    {
      title: 'Negative (<3)',
      value: stats.negativeFeedbacks,
      icon: '👎',
      color: '#ef4444'
    }
  ]

  return (
    <div className="analytics-cards">
      {cards.map((card, index) => (
        <div key={index} className="analytics-card" style={{ '--card-color': card.color }}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsCards

