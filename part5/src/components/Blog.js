import React, { useState } from 'react'
const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: '1px solid grey',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{' '}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.author}</div>
        </>
      )}
    </div>
  )
}

export default Blog
