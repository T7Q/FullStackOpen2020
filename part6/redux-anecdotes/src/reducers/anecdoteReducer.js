import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllFromDb = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: content,
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    payload: id,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = state.find((n) => n.id === action.payload)
      const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
      return state.map((element) => (element.id === updatedAnecdote.id ? updatedAnecdote : element))
    case 'NEW_ANECDOTE':
      const newAnecdote = [...state, action.data]
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
