import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
const initialState = null

const userReducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case 'SET_USER':
    return payload
  case 'LOGIN':
    window.localStorage.getItem('loggedUser', JSON.stringify(payload))
    return payload
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch({
      type: 'INIT_USER',
      payload: user,
    })
    blogService.setToken(user.token)
  }
}

export const logIn = (data) => async (dispatch) => {
  console.log("user reducer logIn")
  try {
    const user = await loginService.login(data)
    dispatch({
      type: 'LOGIN',
      payload: user,
    })
    blogService.setToken(user.token)
  } catch (exception) {
    dispatch(setNotification({ text: 'wrong username or password', type: 'error' }))
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  })
}

export default userReducer
