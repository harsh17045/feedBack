import { useState } from 'react'
import './FeedbackForm.css'

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }))
    // Clear messages when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Client-side validation
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }

    if (!formData.message.trim()) {
      setError('Message is required')
      return
    }

    if (formData.rating < 1 || formData.rating > 5) {
      setError('Rating must be between 1 and 5')
      return
    }

    setSubmitting(true)

    const result = await onSubmit(formData)

    if (result.success) {
      setSuccess('Feedback submitted successfully!')
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        rating: 5
      })
    } else {
      setError(result.error || 'Failed to submit feedback')
    }

    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Rating *</label>
        <div className="rating-input">
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating} className="rating-option">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={formData.rating === rating}
                onChange={handleChange}
              />
              <span className="rating-star">{rating} ⭐</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your feedback message"
          rows="5"
          required
        />
      </div>

      <button type="submit" className="submit-btn" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  )
}

export default FeedbackForm

