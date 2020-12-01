import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAllFromDb = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }

  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
} 

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await createNew(content)
  dispatch({
    type: 'NEW_ANECDOTE',
    payload: newAnecdote,
  })
}

export const addVote = (anecdote) => async (dispatch) => {
  const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const updatedAnecdote = await update(votedAnecdote);
  dispatch({
    type: 'VOTE',
    payload: updatedAnecdote,
  })
}

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await getAllFromDb()
  dispatch({
    type: 'INIT_ANECDOTES',
    payload: anecdotes,
  })
}

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id
      return state.map((an) => (an.id !== id ? an : action.payload));
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    case 'INIT_ANECDOTES':
      return action.payload
    default:
      return state
  }
}

export default anecdoteReducer
