import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getBlogs, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment(comment, blog))
  }

  return (
    <div className="mt-1">
      <h2 className="mt-1" style={{ color: '#70adb5' }}>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="mt-2 mb-2">
        likes {blog.likes}{' '}
        <Button id="likeBtn" onClick={likeBlog} style={{ border: 'none', color: '#132743', backgroundColor: '#ffcbcb' }}>
          like
        </Button>
      </div>
      <div className="mt-2 mb-2">added by {blog.user.name ? blog.user.name : blog.user.username}</div>
      {blog.user && blog.user.username === user.username && (
        <Button id="removeBtn" style={deleteButtonStyle} onClick={handleDeleteBlog}>
          remove
        </Button>
      )}
      <h4 className="text-center mt-1">comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="url">
          <Form.Control type="text" placeholder="comment" value={comment} onChange={handleChange} />
        </Form.Group>
        <Button
          type="submit"
          style={{ width: '100%', border: 'none', color: '#132743', backgroundColor: '#ffcbcb' }}>
          create
        </Button>
      </Form>
      <div className="mt-5"></div>
      <ListGroup>
        {blog.comments.length > 0 &&
          blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}> {comment}</ListGroup.Item>
          ))}
      </ListGroup>
      {/* <ul>
        {blog.comments.length > 0 &&
          blog.comments.map((comment, index) => <li key={index}> {comment}</li>)}
      </ul> */}
    </div>
  )
}

export default Blog
