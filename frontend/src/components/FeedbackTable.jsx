import './FeedbackTable.css'

const FeedbackTable = ({ feedbacks, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'rating-positive'
    if (rating < 3) return 'rating-negative'
    return 'rating-neutral'
  }

  if (loading) {
    return <div className="loading">Loading feedbacks...</div>
  }

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <p>No feedbacks yet. Be the first to submit feedback!</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className="name-cell">{feedback.name}</td>
              <td className="email-cell">{feedback.email}</td>
              <td>
                <span className={`rating-badge ${getRatingColor(feedback.rating)}`}>
                  {feedback.rating} ⭐
                </span>
              </td>
              <td className="message-cell">{feedback.message}</td>
              <td className="date-cell">{formatDate(feedback.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbackTable

