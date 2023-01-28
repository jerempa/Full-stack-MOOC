import axios from 'axios'
const baseUrl = '/api/login'

const user_login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
} 

export default { user_login }