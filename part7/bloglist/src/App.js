import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = () => {
    dispatch(logOut())
  }
  console.log('USER APP', user)
  return (
    <div>
      <h2> {user === null ? 'Log in to application' : 'blogs'} </h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <BrowserRouter>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Switch>
            <Route exact path="/">
              <Blogs />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
