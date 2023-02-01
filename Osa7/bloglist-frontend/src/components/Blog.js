import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({blogs, HandleLike, HandleRemove, user}) => {
    const findById = (id) => {
        let correctBlog = null
        blogs.map(blog =>  blog.id !== id ? null : correctBlog = blog)
        return correctBlog
    }

    const params = useParams('/blogs:id')
    const id = params.id
    const blog = findById(id)
    if (!blog) {
        return null
    }
  return (
    <div className='blog'>
        <h2> {blog.title} {blog.author} </h2>
        <a href ={blog.url}> {blog.url} </a>
        <p className='like-count'> {blog.likes} likes <button id='like' onClick={() => HandleLike(blog)}> like </button> </p>
        {blog.user ? <p> Added by {blog.user.name} </p> : null }
        {blog.user ? (user.username === blog.user.username ? <button id='remove' onClick={() => HandleRemove(blog)}> remove </button> : null ) : null }
        <h3> comments </h3>
        <CommentForm /> 
        {blog.comments.map((comment, index) => <li key={index}> {comment} </li>)}
      <div>
      </div> 
      </div>

  )  
}

export default Blog