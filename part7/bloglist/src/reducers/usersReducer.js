import userService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = []
const userReducers = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
  case 'GET_USERS':
    return payload
  default:
    return state
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      payload: users,
    })
  } catch (e) {
    dispatch(setNotification('Oops, something went wrong getting users data from the server', true))
  }
}

export default userReducers
