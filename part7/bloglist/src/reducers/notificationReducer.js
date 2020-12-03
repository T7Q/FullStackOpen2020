const initialState = { text: '', type: '' }

const notificationReducer = (state = initialState, action) => {
  const payload = action.payload

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { text: payload.text, type: payload.type, id: payload.id }
  case 'CLEAR_NOTIFICATION':
    return { text: '', type: '' }
  default:
    return state
  }
}

export const setNotification = (data, seconds = 5) => async (dispatch, getState) => {
  clearTimeout(getState().notification.id)
  let id = setTimeout(() => {
    dispatch(clearNotification())
  }, seconds * 1000)
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: { text: data.text, type: data.type, id: id },
  })
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
