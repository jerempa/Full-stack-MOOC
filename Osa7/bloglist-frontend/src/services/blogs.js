import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async updatedBlog => {
  const url = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(url, updatedBlog)
  return response.data
}

const removeBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  return response.data
}

const getComments = async id => {
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.get(url)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}/comments`
  const response = await axios.post(url, comment, config)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog, getComments, addComment }