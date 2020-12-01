import React from 'react'

const blogForm = ({ newBlog, handleAddBlog, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input name="title" value={newBlog.title} onChange={handleAddBlog} />
      </div>
      <div>
        author: <input name="author" value={newBlog.author} onChange={handleAddBlog} />
      </div>
      <div>
        url: <input name="url" value={newBlog.url} onChange={handleAddBlog} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default blogForm
