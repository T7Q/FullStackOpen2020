import React, { useState } from 'react'

const Login = ({ show, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("here", username, password)
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
