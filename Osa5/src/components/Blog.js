import { useState } from 'react'
import PropsTypes from 'prop-types'

const Blog = ({blog, HandleLike, HandleRemove, user}) => {

  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const blogDetails = { display: visible ? '' : 'none' }
  let id = blog.user
  const toggleVisibility = () => {
    setVisible(!visible)
    if (buttonText === 'view') {
      setButtonText('hide')
    }
    else {
      setButtonText('view')
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  let showRemove = true
  if (blog.user){
    if (user.username === blog.user.username) {
      showRemove = true
    }
    else if (id === blog.user) {
      showRemove = true
    }
    else if (user.username !== blog.user.username) {
      showRemove = false
    }
  } else {
    showRemove = false
  }
  return (
    <div className='blog' style={blogStyle}>
      <div>
        <p> {blog.title} </p> {blog.author}  
        <button id='view' onClick={toggleVisibility}>{buttonText}</button>
        {visible && <div style={blogDetails}>
        <p> {blog.url} </p>
        <p className='like-count'> likes {blog.likes} 
        <button id='like' onClick={() => HandleLike(blog)}> like </button> </p>
        {showRemove ? <button id='remove' onClick={() => HandleRemove(blog)}> remove </button> : null }
      </div> }
      </div>
    </div>
  )  
}

Blog.PropsTypes = {
  blog: PropsTypes.array.isRequired,
  HandleLike  : PropsTypes.func.isRequired,
  HandleRemove : PropsTypes.func.isRequired
}

export default Blog