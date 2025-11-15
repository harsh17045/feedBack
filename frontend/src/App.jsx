import { useState, useEffect } from 'react'
import FeedbackForm from './components/FeedbackForm'
import FeedbackTable from './components/FeedbackTable'
import AnalyticsCards from './components/AnalyticsCards'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [feedbacks, setFeedbacks] = useState([])
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    averageRating: 0,
    positiveFeedbacks: 0,
    negativeFeedbacks: 0
  })
  const [loading, setLoading] = useState(true)

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`)
      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data)
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchFeedbacks(), fetchStats()])
      setLoading(false)
    }
    loadData()
  }, [])

  // Handle new feedback submission
  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      })

      if (response.ok) {
        // Refresh feedbacks and stats
        await Promise.all([fetchFeedbacks(), fetchStats()])
        return { success: true }
      } else {
        const error = await response.json()
        return { success: false, error: error.error || 'Failed to submit feedback' }
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Feedback Management Dashboard</h1>
      </header>

      <main className="app-main">
        <div className="container">
          <AnalyticsCards stats={stats} loading={loading} />
          
          <div className="content-grid">
            <div className="form-section">
              <h2>Submit Feedback</h2>
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </div>

            <div className="table-section">
              <h2>All Feedbacks</h2>
              <FeedbackTable feedbacks={feedbacks} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

