import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  }

  const padding = {
    padding: 5,
  }

  if (!user) return null

  return (
    <div style={{ backgroundColor: 'grey' }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span style={padding}>{user.name} logged in</span>
      <button style={padding} onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default NavBar
