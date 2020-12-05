import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn, setUser } from '../reducers/userReducer'
import { Form, Button, Row, Col } from 'react-bootstrap'

const loginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    dispatch(setUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn({ username, password }))
  }

  return (
    <div>
      <Row>
        <Col xs={{ span: 6, offset: 3 }}>
          <Form className="text-center mt-2" onSubmit={handleLogin}>
            <Form.Group controlId="formUsername">
              <Form.Control
                type="text"
                placeholder="Enter username"
                {...username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                {...password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <Button style={{ width: '100%', border: 'none', color: '#132743', backgroundColor: '#ffcbcb' }} type="submit">
              login
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default loginForm
