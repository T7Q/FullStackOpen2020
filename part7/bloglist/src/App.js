import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { getBlogs } from './reducers/blogReducer'
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blog)
  const match = useRouteMatch('/users/:id')
  const userInfo = match ? users.find((u) => u.id === match.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  console.log("blogs", blogs)
  const blog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  useEffect(() => {
    dispatch(setUser())
    dispatch(getUsers())
    dispatch(getBlogs())
  }, [dispatch])

  return (
    <div>
      <NavBar user={user} />
      <h2>{user === null ? 'Log in to application' : 'blog app'}</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <Switch>
            <Route exact path="/">
              <Blogs />
            </Route>
            <Route path="/blogs/:id">
              <Blog user={user} blog={blog} />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route path="/users/:id">
              <User user={userInfo} />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
