const initialState = ''

const filterReducer = (state = initialState, action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (message) => {
  return {
    type: 'SET_FILTER',
    data: message,
  }
}

export default filterReducer
