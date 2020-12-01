import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleAddBlog = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const result = await blogService.create(newBlog)
      setBlogs(blogs.concat(result))
    } catch (e) {
      setErrorMessage('Fields cant be empty')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginPage = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogPage = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      <form onSubmit={addBlog}>
        <div>
          title: <input name="title" value={newBlog.title} onChange={handleAddBlog} />
        </div>
        <div>
          author: <input name="author" value={newBlog.author} onChange={handleAddBlog} />
        </div>
        <div>
          url: <input name="url" value={newBlog.url} onChange={handleAddBlog} />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return <div>{user === null ? loginPage() : blogPage()}</div>
}

export default App
