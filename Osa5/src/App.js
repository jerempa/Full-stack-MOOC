import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import Success from './components/Success'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()



  useEffect(() => {
    const data = async () => {
      const initialBlogs = await blogService.getAll()
      const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)}
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
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
    const index = newBlogs.findIndex(b => b.id === blog.id)
    newBlogs[index] = {...blog}
    setBlogs(newBlogs)
  }

  const HandleRemove = async (blog) => {
    try {    
      const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      blogService.removeBlog(blog.id)
    }
    setBlogs(blogs.filter(oldBlogs => oldBlogs.id !== blog.id))
    setSuccessMessage(`${blog.title} by ${blog.author} removed`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3500)
  } catch (exception) {
    setErrorMessage('Error while trying to remove the blog')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3500)
  }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(result))
      setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
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
      <div>
        <h2>Log in to application</h2>
        <Error message={errorMessage} />
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername}
      password={password} setPassword={setPassword} />
      </div>
    ) 
  }

  return (
    <div>
      <h2>blogs</h2>
      <p> {user.name} logged in 
      <button onClick={() => HandleLogout()} type="submit">logout</button></p> 
      <Error message={errorMessage} />
      <Success message={successMessage} />
      <BlogForm createBlog={addBlog}  blogFormRef={blogFormRef}/> 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} HandleLike={HandleLike} 
        HandleRemove={HandleRemove} user={user}
        />
      )}
    </div>
  )

}

export default App
