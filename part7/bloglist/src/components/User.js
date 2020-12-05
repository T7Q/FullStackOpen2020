import React from 'react'
import { ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2 className="text-center" style={{ color: '#ffcbcb', border: 'none' }}>
        {user.name}
      </h2>
      <ListGroup>
        <ListGroup.Item as="li" style={{ backgroundColor: '#70adb5', border: 'none' }} active>
          Added blogs
        </ListGroup.Item>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
