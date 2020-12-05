import React, { useEffect } from 'react'
import { getBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Toggle from './Toggle'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: '1px solid grey',
    borderWidth: 1,
    marginBottom: 5,
  }

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

  return (
    <div>
      <Toggle buttonLabel="new note">
        <BlogForm addBlog={addBlog} />
      </Toggle>
      <div id="blogList">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div style={blogStyle} key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Blogs
