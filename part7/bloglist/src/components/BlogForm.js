import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleAddBlog = (event) => {
    setNewBlog({ ...newBlog, [event.target.placeholder]: event.target.value })
  }

  return (
    <div>
      <Form
        className="text-center mt-2"
        onSubmit={(e) => {
          e.preventDefault()
          addBlog(newBlog)
        }}>
        <Form.Group controlId="title">
          <Form.Control
            type="text"
            placeholder="title"
            value={newBlog.title}
            onChange={handleAddBlog}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Control
            type="text"
            placeholder="author"
            value={newBlog.author}
            onChange={handleAddBlog}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Control
            type="text"
            placeholder="url"
            value={newBlog.url}
            onChange={handleAddBlog}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{ width: '100%', border: 'none', color: '#132743', backgroundColor: '#ffcbcb' }}>
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
