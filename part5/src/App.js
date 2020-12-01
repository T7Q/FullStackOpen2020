import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState({ text: '', type: '' })
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

  const addBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog)
      setBlogs(blogs.concat(result))
      setNotification({ text: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: '' })
      setTimeout(() => setNotification({ text: '', type: '' }), 3000)
    } catch (e) {
      setNotification({ text: `fileds cannot be empty`, type: 'error' })
      setTimeout(() => {
        setNotification({ text: '', type: '' })
      }, 3000)
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
      setNotification({ text: 'wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ text: '', type: '' })
      }, 3000)
    }
  }

  const updateBlog = async (blogInfo) => {
    try {
      await blogService.update(blogInfo)
      const updatedBlogs = blogs.map((blog) => (blog.id === blogInfo.id ? { ...blogInfo } : blog))
      setBlogs(updatedBlogs)
    } catch (e) {
      setNotification({ text: 'oops, smth went wrong updating blog info', type: 'error' })
      setTimeout(() => {
        setNotification({ text: '', type: '' })
      }, 3000)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog))
      setBlogs(updatedBlogs)
      setNotification({ text: 'blog was successfully deleted', type: '' })
      setTimeout(() => {
        setNotification({ text: '', type: '' })
      }, 3000)
    } catch (e) {
      setNotification({ text: 'error deleting the blog', type: 'error' })
      setTimeout(() => {
        setNotification({ text: '', type: '' })
      }, 3000)
    }
  }

  return (
    <div>
      <h2> {user === null ? 'Log in to application' : 'blogs'} </h2>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          <Toggle buttonLabel="new note">
            <BlogForm addBlog={addBlog} />
          </Toggle>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} username={user.username}/>
            ))}
        </div>
      )}
    </div>
  )
}

export default App
