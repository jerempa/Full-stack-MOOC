import BlogForm from './BlogForm'
import { Link } from "react-router-dom"
import { useRef  } from 'react'
import { Table } from 'react-bootstrap'

const AllBlogs = ({blogs, createBlog}) => {

    const blogFormRef = useRef()
      const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
      }
    blogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div className='blogs'>
        <BlogForm createBlog={createBlog} blogFormRef={blogFormRef}/>
        <Table striped>
          <tbody> 
            {blogs.map(blog => <tr style={blogStyle} key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}> {blog.title} </Link></td>
              <td>{blog.author}</td></tr>)}
          </tbody>
        </Table>
      </div>     
    )
}

export default AllBlogs