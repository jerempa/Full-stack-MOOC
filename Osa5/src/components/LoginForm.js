import PropsTypes from 'prop-types'

const LoginForm = ({setUsername, setPassword, username, password, handleLogin}) => {
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}
  
  return (
    <div>
      <form onSubmit={handleLogin}>
  <div>
    username
      <input
      id='username'
      type="text"
      value={username}
      name="Username"
      onChange={handleUsernameChange}
    />
  </div>
  <div>
    password
      <input
      id='password'
      type="password"
      value={password}
      name="Password"
      onChange={handlePasswordChange}
    />
  </div>
  <button id='login-button' type="submit">login</button>
  </form> 
    </div>
  )
  }

LoginForm.propTypes = {
  handleLogin: PropsTypes.func.isRequired,
  username: PropsTypes.string.isRequired,
  password: PropsTypes.string.isRequired,
  setUsername: PropsTypes.func.isRequired,
  setPassword: PropsTypes.func.isRequired
}
  
  export default LoginForm