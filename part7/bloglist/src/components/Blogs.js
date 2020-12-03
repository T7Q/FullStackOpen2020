import React, { useEffect } from 'react'
import { getBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Toggle from './Toggle'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  const addBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      dispatch(getBlogs())
      dispatch(
        setNotification({
          text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: '',
        })
      )
      setTimeout(() => setNotification({ text: '', type: '' }), 3000)
    } catch (e) {
      dispatch(setNotification({ text: `fileds cannot be empty`, type: 'error' }))
    }
  }
  const updateBlog = async (blogInfo) => {
    try {
      await blogService.update(blogInfo)
      dispatch(getBlogs())
    } catch (e) {
      dispatch(setNotification({ text: 'oops, smth went wrong updating blog info', type: 'error' }))
    }
  }
  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      dispatch(getBlogs())
      dispatch(setNotification({ text: 'blog was successfully deleted', type: '' }))
    } catch (e) {
      dispatch(setNotification({ text: 'error deleting the blog', type: 'error' }))
    }
  }

  return (
    <div>
      <Toggle buttonLabel="new note">
        <BlogForm addBlog={addBlog} />
      </Toggle>
      <div id="blogList">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              username={user.username}
            />
          ))}
      </div>
    </div>
  )
}

export default Blogs
