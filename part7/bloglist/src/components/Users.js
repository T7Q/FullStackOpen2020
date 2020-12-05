import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>users</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
