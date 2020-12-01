import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const createNew = async (content) => {
  const object = { content, votes: 0 };

  const response = await axios.post(baseUrl, object);
  return response.data;
};


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.new.value
    event.target.new.value = ''
    const newAnecdote = await createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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

export default AnecdoteForm
