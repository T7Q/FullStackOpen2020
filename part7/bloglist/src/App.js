import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = () => {
    dispatch(logOut())
  }
  return (
    <div>
      <h2> {user === null ? 'Log in to application' : 'blogs'} </h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Blogs user={user} />
        </div>
      )}
    </div>
  )
}

export default App
