import React from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()
  if (!blog) return null

  const deleteButtonStyle = {
    backgroundColor: 'lightblue',
    borderRadius: '5px',
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

  const likeBlog = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) removeBlog(blog.id)
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}{' '}
        <button id="likeBtn" onClick={likeBlog}>
          like
        </button>
      </div>
      added by {blog.user.name ? blog.user.name : blog.user.username}
      <div>{blog.author}</div>
      {blog.user && blog.user.username === user.username && (
        <button id="removeBtn" style={deleteButtonStyle} onClick={handleDeleteBlog}>
          remove
        </button>
      )}
    </div>
  )
}

export default Blog
