import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../reducers/userReducer'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logOut())
  }

  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: #70adb5;
      color: #132743;
    }

    .navbar {
      background-color: #132743;
    }
    `}
      </style>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="text-decoration-none" style={{ color: '#ffcbcb' }} to="/">
              Bloglist
            </Link>
          </Navbar.Brand>
          {user && (
            <>
              <Nav className="mr-auto">
                <Link className="p-2 text-white text-decoration-none" to="/">
                  blogs
                </Link>
                <Link className="p-2 text-white text-decoration-none" to="/users">
                  users
                </Link>
              </Nav>
              <Navbar.Brand style={{ color: '#407088' }}>{user.name} logged in</Navbar.Brand>
              <Button variant="flat" onClick={logout}>
                Logout
              </Button>{' '}
            </>
          )}
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
