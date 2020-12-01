import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.new.value
    event.target.new.value = ''
    createAnecdote(content)
    setNotification(`you created '${content}'`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
