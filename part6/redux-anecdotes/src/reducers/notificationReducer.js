const initialState = ''

const notificationReducer = (state = initialState, action) => {
  // console.log('state now: ', state);
  // console.log('action', action);
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer
