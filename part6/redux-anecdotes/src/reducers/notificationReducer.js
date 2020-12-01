const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message = '', seconds = 5) => async (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: message,
  })
  setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
