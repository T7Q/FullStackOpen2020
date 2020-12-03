import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const blogReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
  case 'INIT_BLOGS':
    return payload
  default:
    return state
  }
}

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs,
    })
  } catch (e) {
    dispatch(
      setNotification({
        text: `Ooops, smth went wrong getting the blogs from server`,
        type: 'error',
      })
    )
  }
}

export const addBlog = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      payload: blogs,
    })
  } catch (e) {
    dispatch(
      setNotification({
        text: `Ooops, smth went wrong getting the blogs from server`,
        type: 'error',
      })
    )
  }
}

export default blogReducer
