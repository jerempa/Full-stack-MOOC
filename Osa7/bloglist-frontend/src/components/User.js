import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({users}) => {
    const findById = (id) => {
        let correctUser = null
        users.map(user =>  user.id !== id ? null : correctUser = user)
        return correctUser
    }

    const params = useParams('/users:id')
    const id = params.id
    const user = findById(id)
    if (!user) {
        return null
    }
  return (
    <div className='user'>
        <h2> {user.name} </h2>
        <h3> Added blogs </h3>
          <Table striped>
            <tbody>  
              {user.blogs.map((blog, index) => <tr key={index}><td> {blog.title} </td></tr>)}
            </tbody>
          </Table>
    </div>
  )  
}

export default User