import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleAddBlog = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addBlog(newBlog)
      }}>
      <div>
        title: <input id='title' name="title" value={newBlog.title} onChange={handleAddBlog} />
      </div>
      <div>
        author: <input id='author' name="author" value={newBlog.author} onChange={handleAddBlog} />
      </div>
      <div>
        url: <input id='url' name="url" value={newBlog.url} onChange={handleAddBlog} />
      </div>
      <button id="createBtn" type="submit">create</button>
    </form>
  )
}

export default BlogForm
