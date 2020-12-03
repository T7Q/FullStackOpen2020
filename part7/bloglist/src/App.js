import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog)
      setBlogs(blogs.concat(result))
      dispatch(
        setNotification({
          text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: '',
        })
      )
      setTimeout(() => setNotification({ text: '', type: '' }), 3000)
    } catch (e) {
      dispatch(setNotification({ text: `fileds cannot be empty`, type: 'error' }))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ text: 'wrong username or password', type: 'error' }))
    }
  }

  const updateBlog = async (blogInfo) => {
    try {
      await blogService.update(blogInfo)
      const updatedBlogs = blogs.map((blog) => (blog.id === blogInfo.id ? { ...blogInfo } : blog))
      setBlogs(updatedBlogs)
    } catch (e) {
      dispatch(setNotification({ text: 'oops, smth went wrong updating blog info', type: 'error' }))
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog))
      setBlogs(updatedBlogs)
      dispatch(setNotification({ text: 'blog was successfully deleted', type: '' }))
    } catch (e) {
      dispatch(setNotification({ text: 'error deleting the blog', type: 'error' }))
    }
  }

  return (
    <div>
      <h2> {user === null ? 'Log in to application' : 'blogs'} </h2>
      <Notification />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Toggle buttonLabel="new note">
            <BlogForm addBlog={addBlog} />
          </Toggle>
          <div id="blogList">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  username={user.username}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
