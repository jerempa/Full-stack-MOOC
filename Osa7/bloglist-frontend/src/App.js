import { useState, useEffect } from 'react'
import AllBlogs from './components/AllBlogs'
import AllUsers from './components/AllUsers'
import User from './components/User'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const data = async () => {
      const initialBlogs = await blogService.getAll()
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    data()
  }, [])

  useEffect(() => {
    const data = async () => {
      const initialUsers = await userService.getAll()
      setUsers(initialUsers)
    }
    data()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.user_login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
    }
  }

  const HandleLogout = async (event) => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const HandleLike = async (blog) => {
    blog.likes++
    blogService.updateBlog(blog)
    const newBlogs = [...blogs]
    const index = newBlogs.findIndex((b) => b.id === blog.id)
    newBlogs[index] = { ...blog }
    setBlogs(newBlogs)
  }

  const HandleRemove = async (blog) => {
    try {
      const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
      if (confirm) {
        blogService.removeBlog(blog.id)
      }
      setBlogs(blogs.filter((oldBlogs) => oldBlogs.id !== blog.id))
      setSuccessMessage(`${blog.title} by ${blog.author} removed`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3500)
      window.location.href = '/'
    } catch (exception) {
      setErrorMessage('Error while trying to remove the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
    }
  }

  const addBlog = async (blogObject, blogFormRef) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createBlog(blogObject)
      result.user = {
        username: user.username,
        name: user.name,
        id: result.user
      }
      setBlogs(blogs.concat(result))
      setSuccessMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3500)
    } catch (exception) {
      setErrorMessage('Error while trying to add the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3500)
    }
  }

  if (user === null) {
    return (
      <div className="container">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <NavigationBar />
        <h2>blogs</h2>
        <p>
          {' '}
          {user.name} logged in
          <button onClick={() => HandleLogout()} type="submit">
            logout
          </button>
        </p>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Routes>
          <Route
            path="/"
            element={<AllBlogs blogs={blogs} createBlog={addBlog} />}
          />
          <Route path="/users/" element={<AllUsers users={users} />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blogs={blogs}
                HandleLike={HandleLike}
                HandleRemove={HandleRemove}
                user={user}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
