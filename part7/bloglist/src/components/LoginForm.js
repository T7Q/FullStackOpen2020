import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logIn, setUser } from '../reducers/userReducer'

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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default loginForm
