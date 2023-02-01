import PropsTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({setUsername, setPassword, handleLogin}) => {

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleUsernameChange}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            onChange={handlePasswordChange}
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
  }

LoginForm.propTypes = {
  handleLogin: PropsTypes.func.isRequired,
  setUsername: PropsTypes.func.isRequired,
  setPassword: PropsTypes.func.isRequired
}
  
  export default LoginForm