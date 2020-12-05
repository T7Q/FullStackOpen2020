import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const blogReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
  case 'INIT_BLOGS':
    return payload
  case 'UPDATE_BLOG':
    console.log("GOTE HERE state", state)
    console.log("GOTE HERE payload", payload)
    return state.map((blog) => (blog.id === payload.id ? { ...payload } : blog))
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

export const addComment = (comment, blog) => async (dispatch) => {
  try {
    await blogService.comment(comment, blog.id)
    const newBlog = { ...blog }
    newBlog.comments = newBlog.comments.concat(comment)
    console.log("new blog", newBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      payload: newBlog,
    })
    dispatch(
      setNotification({
        text: `Comment was successfully added`,
        type: '',
      })
    )
  } catch (e) {
    dispatch(
      setNotification({
        text: `Ooops, smth went wrong updating blog comments`,
        type: 'error',
      })
    )
  }
}

export default blogReducer
