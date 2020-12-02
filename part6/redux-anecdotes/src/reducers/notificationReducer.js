const initialState = { message: '', id: 0 }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.payload.message, id: action.payload.id }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '' }
    default:
      return state
  }
}

export const setNotification = (message = '', timeout = 5) => async (dispatch, getState) => {
  clearTimeout(getState().notification.id)

  let id = setTimeout(() => {
    dispatch(clearNotification())
  }, timeout * 1000)

  dispatch({
    type: 'SET_NOTIFICATION',
    payload: { message: message, id: id },
  })
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
