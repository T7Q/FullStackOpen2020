import React, { useState } from 'react'
const Blog = ({ blog, updateBlog, removeBlog, username }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: '1px solid grey',
    borderWidth: 1,
    marginBottom: 5,
  }
  const deleteButtonStyle = {
    backgroundColor: 'lightblue',
    borderRadius: '5px',
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
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}{' '}{blog.author}
        <button id="toggleBtn" onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div >
            likes {blog.likes} <button id="likeBtn" onClick={likeBlog}>like</button>
          </div>
          <div>{blog.author}</div>
          {blog.user && blog.user.username === username && (
            <button id="removeBtn" style={deleteButtonStyle} onClick={handleDeleteBlog}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
