import { Link } from "react-router-dom"
import React from 'react'
import { Table } from 'react-bootstrap'

const AllUsers = ({users}) => {

  return (
    <div className='allusers'>
      <h2> Users </h2>
      <p align='right'> <strong> blogs created </strong> </p>
      <Table striped>
        <tbody> 
          {users.map(user => <tr key={user.id}> 
            <td><Link to={`/users/${user.id}`}>{user.name} </Link> </td> 
            <td> {user.blogs.length} </td></tr>)}
        </tbody> 
      </Table>
      </div>
  )  
}



export default AllUsers