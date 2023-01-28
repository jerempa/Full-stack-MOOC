import Togglable from './Togglable'
import { useState } from 'react'

const BlogForm = ({createBlog, blogFormRef}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
          createBlog({
            title: title,
            author: author,
            url: url
          })

        setTitle('')
        setAuthor('')
        setUrl('')
      } 
    
    return (
      <div className='blogform'>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
            <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
            <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='submit' type="submit">create</button>
        </form>
        </Togglable>   
          </div>
          )
  }

  export default BlogForm